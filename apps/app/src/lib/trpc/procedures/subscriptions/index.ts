import { t } from "@/lib/trpc/trpc";
import { createCheckoutSession } from "@/lib/trpc/procedures/subscriptions/createCheckoutSession";
import { createPortalSession } from "@/lib/trpc/procedures/subscriptions/createPortalSession";

export const subscriptions = t.router({
	createCheckoutSession,
	createPortalSession
});
