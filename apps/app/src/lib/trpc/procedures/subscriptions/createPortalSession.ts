import { UserModel } from "@repo/models";
import { stripe } from "@/lib/services/stripe";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";
import { z } from "zod";

const createPortalSessionSchema = z.object({
	returnUrl: z.string().url()
});

type CreatePortalSessionInput = z.infer<typeof createPortalSessionSchema>;

type CreatePortalSessionOutput = {
	url: string;
};

const createPortalSessionHandler: TRPCProcedure<
	CreatePortalSessionInput,
	CreatePortalSessionOutput
> = async ({ ctx, input }) => {
	const userId = ctx.session.user.id;
	console.log(`Creating portal session for user ${userId}`);

	try {
		const user = await UserModel.find(userId);

		if (!user) {
			console.error(`createPortalSessionHandler: User ${userId} not found`);
			throw new Error("Failed to create portal session");
		}

		// Only check if the stripe_customer_id exists, don't check the status
		if (!user.subscription?.stripe_customer_id) {
			throw new Error("No subscription found");
		}

		// Create portal session using the customer ID from the user's subscription
		const session = await stripe.billingPortal.sessions.create({
			customer: user.subscription.stripe_customer_id,
			return_url: input.returnUrl
		});

		return {
			success: true,
			data: { url: session.url }
		};
	} catch (error) {
		console.error(`createPortalSessionHandler: User ${userId} - ${error}`);
		throw new Error("Failed to create portal session");
	}
};

export const createPortalSession = protectedProcedure
	.input(createPortalSessionSchema)
	.mutation(createPortalSessionHandler);
