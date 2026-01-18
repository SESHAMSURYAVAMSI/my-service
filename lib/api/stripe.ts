import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;

export const stripePromise = loadStripe(stripePublishableKey);

export async function createCheckoutSession(priceId: string, customerEmail?: string) {
  const response = await fetch('/api/stripe/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId,
      customerEmail,
      successUrl: `${window.location.origin}/billing/success`,
      cancelUrl: `${window.location.origin}/billing`,
    }),
  });

  const session = await response.json();
  return session;
}

export async function createCustomerPortalSession() {
  const response = await fetch('/api/stripe/portal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const portalSession = await response.json();
  return portalSession;
}

export async function getSubscriptionStatus() {
  const response = await fetch('/api/stripe/subscription');
  const subscription = await response.json();
  return subscription;
}