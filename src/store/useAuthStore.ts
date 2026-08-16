"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "@/types";
import {
  hashPassword,
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
  uid,
} from "@/lib/storage";

interface AuthState {
  users: User[];
  currentUserId: string | null;
  register: (input: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    requireVerification?: boolean;
  }) => Promise<{ ok: boolean; error?: string; needsVerification?: boolean }>;
  verifyEmail: (token: string) => Promise<{ ok: boolean; error?: string }>;
  login: (input: {
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; error?: string; needsVerification?: boolean }>;
  logout: () => void;
  currentUser: () => User | null;
  isAuthenticated: () => boolean;
}

const seedAdmin: User = {
  id: "admin",
  firstName: "Admin",
  lastName: "SteamWriterAi",
  email: "admin@steamwriterai.app",
  passwordHash:
    "3d210d2b4e1f74bd26e7ae189d5469baa7a2f65c402d99ef28c9b5fba71d7d4e",
  role: "admin",
  emailVerified: true,
  createdAt: new Date(0).toISOString(),
};

const seedUser: User = {
  id: "user-default",
  firstName: "Demo",
  lastName: "User",
  email: "abubakarmusa09876@gmail.com",
  passwordHash:
    "0c05830b6569471e8d8ea565af16d20a0a2dd470246cc413b7db54607f75a5a6",
  role: "user",
  emailVerified: true,
  createdAt: new Date(0).toISOString(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      users: [seedAdmin, seedUser],
      currentUserId: null,

      async register({ firstName, lastName, email, password, requireVerification = false }) {
        const normalized = email.trim().toLowerCase();
        if (!firstName || !lastName || !normalized || password.length < 6) {
          return { ok: false, error: "Please complete all fields (password: 6+ characters)." };
        }
        const users = get().users;
        if (users.some((u) => u.email === normalized)) {
          return { ok: false, error: "An account with this email already exists." };
        }
        const passwordHash = await hashPassword(password);

        if (requireVerification) {
          const token = uid();
          const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
          const user: User = {
            id: uid(),
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: normalized,
            passwordHash,
            role: "user",
            emailVerified: false,
            emailVerificationToken: token,
            emailVerificationExpires: expires,
            createdAt: new Date().toISOString(),
          };
          set({ users: [...users, user] });

          const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://steamwriterai.com";
          fetch("/api/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: "verification",
              to: normalized,
              firstName: firstName.trim(),
              verificationUrl: `${siteUrl}/verify-email?token=${token}`,
            }),
          }).catch(() => {});

          return { ok: true, needsVerification: true };
        }

        const user: User = {
          id: uid(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: normalized,
          passwordHash,
          role: "user",
          emailVerified: true,
          createdAt: new Date().toISOString(),
        };
        set({ users: [...users, user], currentUserId: user.id });

        fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "welcome",
            to: normalized,
            firstName: firstName.trim(),
          }),
        }).catch(() => {});

        return { ok: true };
      },

      async verifyEmail(token) {
        const users = get().users;
        const user = users.find(
          (u) => u.emailVerificationToken === token && u.emailVerificationExpires
        );

        if (!user) {
          return { ok: false, error: "Invalid or expired verification link." };
        }

        if (new Date(user.emailVerificationExpires!) < new Date()) {
          return { ok: false, error: "This verification link has expired. Please request a new one." };
        }

        set({
          users: users.map((u) =>
            u.id === user.id
              ? { ...u, emailVerified: true, emailVerificationToken: undefined, emailVerificationExpires: undefined }
              : u
          ),
          currentUserId: user.id,
        });

        fetch("/api/email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "welcome",
            to: user.email,
            firstName: user.firstName,
          }),
        }).catch(() => {});

        return { ok: true };
      },

      async login({ email, password }) {
        const normalized = email.trim().toLowerCase();
        const passwordHash = await hashPassword(password);
        const user = get().users.find(
          (u) => u.email === normalized && u.passwordHash === passwordHash
        );
        if (!user) {
          return { ok: false, error: "Invalid email or password." };
        }
        if (user.emailVerified === false) {
          return { ok: false, needsVerification: true, error: "Please verify your email before logging in." };
        }
        set({ currentUserId: user.id });
        return { ok: true };
      },

      logout() {
        set({ currentUserId: null });
      },

      currentUser() {
        const id = get().currentUserId;
        if (!id) return null;
        return get().users.find((u) => u.id === id) ?? null;
      },

      isAuthenticated() {
        return !!get().currentUserId;
      },
    }),
    {
      name: "steamwriterai-auth",
      partialize: (state) => ({ users: state.users, currentUserId: state.currentUserId }),
      storage: {
        getItem: (name) => loadFromStorage(name, null),
        setItem: (name, value) => saveToStorage(name, value),
        removeItem: (name) => removeFromStorage(name),
      },
    }
  )
);
