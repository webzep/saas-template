declare global {
	interface Window {
		Stripe: stripe.Stripe | null;
	}
}

export {};
