"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  PaymentGateway,
  PaymentMethod,
  PaymentOrder,
} from "@/types";
import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
  uid,
} from "@/lib/storage";
import { PLAN, referenceFor } from "@/lib/payments";

interface PaymentState {
  orders: PaymentOrder[];
  createOrder: (input: {
    userId: string;
    email: string;
    name: string;
    gateway: PaymentGateway;
    method: PaymentMethod;
  }) => PaymentOrder;
  markPaid: (orderId: string) => void;
  rejectOrder: (orderId: string, note?: string) => void;
  ordersForUser: (userId: string) => PaymentOrder[];
  hasActiveAccess: (userId: string) => boolean;
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      orders: [],

      createOrder({ userId, email, name, gateway, method }) {
        const now = new Date().toISOString();
        const order: PaymentOrder = {
          id: uid(),
          userId,
          email,
          name,
          plan: PLAN.id,
          amount: PLAN.price,
          currency: PLAN.currency,
          gateway,
          method,
          reference: referenceFor(gateway),
          status: "pending",
          createdAt: now,
          updatedAt: now,
        };
        set({ orders: [...get().orders, order] });
        return order;
      },

      markPaid(orderId) {
        const now = new Date().toISOString();
        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? { ...o, status: "paid", verifiedAt: now, updatedAt: now }
              : o
          ),
        });
      },

      rejectOrder(orderId, note) {
        const now = new Date().toISOString();
        set({
          orders: get().orders.map((o) =>
            o.id === orderId
              ? { ...o, status: "rejected", note, updatedAt: now }
              : o
          ),
        });
      },

      ordersForUser(userId) {
        return get()
          .orders.filter((o) => o.userId === userId)
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      },

      hasActiveAccess(userId) {
        return get().orders.some(
          (o) => o.userId === userId && o.status === "paid"
        );
      },
    }),
    {
      name: "steamwriterai-payments",
      partialize: (state) => ({ orders: state.orders }),
      storage: {
        getItem: (name) => loadFromStorage(name, null),
        setItem: (name, value) => saveToStorage(name, value),
        removeItem: (name) => removeFromStorage(name),
      },
    }
  )
);
