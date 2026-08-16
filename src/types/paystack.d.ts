export {};

declare global {
  interface PaystackTransactionResponse {
    reference: string;
    trans: string;
    status: string;
    message: string;
  }

  interface PaystackPopOptions {
    key: string;
    email: string;
    amount: number;
    currency?: string;
    ref: string;
    metadata?: Record<string, unknown>;
    onSuccess?: (response: PaystackTransactionResponse) => void;
    onCancel?: () => void;
  }

  interface PaystackPop {
    setup(options: PaystackPopOptions): {
      openIframe(): void;
    };
  }

  interface Window {
    PaystackPop?: PaystackPop;
  }
}
