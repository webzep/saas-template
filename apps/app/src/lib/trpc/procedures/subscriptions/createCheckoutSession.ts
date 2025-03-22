import { priceItems } from "@repo/pricing";
import { stripe } from "@/lib/services/stripe";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";
import { z } from "zod";
import { UserModel } from "@repo/models";

const createCheckoutSessionSchema = z.object({
	priceId: z.enum(Object.keys(priceItems) as [string, ...string[]]),
	successUrl: z.string().url(),
	cancelUrl: z.string().url()
});

type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>;

type CreateCheckoutSessionOutput = {
	url: string;
};

const createCheckoutSessionHandler: TRPCProcedure<
	CreateCheckoutSessionInput,
	CreateCheckoutSessionOutput
> = async ({ ctx, input }) => {
	const userId = ctx.session.user.id;
	console.log(`Creating checkout session for user ${userId}`);

	try {
		const { priceId, successUrl, cancelUrl } = input;
		const price = priceItems[priceId];

		if (!price) {
			throw new Error("Invalid price ID");
		}

		const user = await UserModel.find(userId);

		if (!user) {
			console.error(`createCheckoutSessionHandler: User ${userId} not found`);
			throw new Error("Failed to create checkout session");
		}

		// Get or create Stripe customer
		let customerId = user.subscription?.stripe_customer_id;
		if (!customerId) {
			const customer = await stripe.customers.create({
				email: user.email,
				metadata: { user_id: userId }
			});
			customerId = customer.id;
		}

		// Create checkout session
		const session = await stripe.checkout.sessions.create({
			customer: customerId,
			line_items: [{ price: priceId, quantity: 1 }],
			mode: "subscription",
			success_url: successUrl,
			cancel_url: cancelUrl,
			client_reference_id: userId, // Add this for webhook identification
			metadata: { user_id: userId, price_id: priceId },
			subscription_data: {
				metadata: {
					user_id: userId, // Using user_id to match webhook handler
					price_id: priceId,
					stripe_customer_id: customerId
				}
			}
		});

		if (!session.url) {
			throw new Error("Failed to create checkout session");
		}

		return {
			success: true,
			data: { url: session.url }
		};
	} catch (error) {
		console.error(`createCheckoutSessionHandler: User ${userId} - ${error}`);
		throw new Error("Failed to create checkout session");
	}
};

export const createCheckoutSession = protectedProcedure
	.input(createCheckoutSessionSchema)
	.mutation(createCheckoutSessionHandler);
