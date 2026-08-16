import type {
  PaymentGateway,
  PaymentMethod,
  PaymentPlan,
} from "@/types";

export const PLAN: {
  id: PaymentPlan;
  name: string;
  price: number;
  currency: "NGN";
} = {
  id: "standard",
  name: "SteamWriterAi Full Access",
  price: 2000,
  currency: "NGN",
};

export interface GatewayConfig {
  id: PaymentGateway;
  name: string;
  tagline: string;
  method: PaymentMethod;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  publicKey?: string;
  steps: string[];
}

export const GATEWAYS: GatewayConfig[] = [
  {
    id: "opay",
    name: "OPay",
    tagline: "Transfer directly to our OPay account",
    method: "bank-transfer",
    bankName: "OPay Digital Services Ltd",
    accountName:
      process.env.NEXT_PUBLIC_OPAY_ACCOUNT_NAME || "KAYODE BENJAMIN MAYOWA",
    accountNumber:
      process.env.NEXT_PUBLIC_OPAY_ACCOUNT_NUMBER || "9056444277",
    steps: [
      "Tap “I’ve paid” to generate your payment reference.",
      "Open your OPay app → Transfer → send ₦2,000 to the account above.",
      "Use the payment reference as your transfer narration.",
      "Submit the form — your access is confirmed by our team.",
    ],
  },
  {
    id: "moniepoint",
    name: "Moniepoint",
    tagline: "Transfer directly to our Moniepoint account",
    method: "bank-transfer",
    bankName: "Moniepoint",
    accountName: process.env.NEXT_PUBLIC_MONIEPOINT_ACCOUNT_NAME || "",
    accountNumber: process.env.NEXT_PUBLIC_MONIEPOINT_ACCOUNT_NUMBER || "",
    steps: [
      "Tap “I’ve paid” to generate your payment reference.",
      "Open your Moniepoint app → Transfer → send ₦2,000 to the account above.",
      "Use the payment reference as your transfer narration.",
      "Submit the form — your access is confirmed by our team.",
    ],
  },
  {
    id: "paystack",
    name: "Paystack",
    tagline: "Pay instantly with card, bank transfer or USSD",
    method: "card",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    steps: [
      "Tap “Pay with Paystack” — a secure payment popup opens.",
      "Choose card, bank transfer or USSD and complete payment.",
      "Your access is activated instantly on success.",
    ],
  },
];

export function gatewayById(id: PaymentGateway): GatewayConfig {
  return GATEWAYS.find((g) => g.id === id) ?? GATEWAYS[0];
}

export function referenceFor(gateway: PaymentGateway): string {
  const prefix: Record<PaymentGateway, string> = {
    opay: "KBM-OPY",
    paystack: "KBM-PSK",
    moniepoint: "KBM-MNP",
  };
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix[gateway]}-${rand}-${Date.now().toString(36).toUpperCase()}`;
}

export function formatNaira(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

const PAYSTACK_SCRIPT = "https://js.paystack.co/v1/inline.js";

export function loadPaystack(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.PaystackPop) {
      resolve();
      return;
    }
    const existing = document.getElementById(
      "paystack-inline-js"
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Paystack."))
      );
      return;
    }
    const script = document.createElement("script");
    script.id = "paystack-inline-js";
    script.src = PAYSTACK_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack."));
    document.head.appendChild(script);
  });
}
