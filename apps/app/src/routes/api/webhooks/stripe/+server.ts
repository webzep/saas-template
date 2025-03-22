import { json } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { getAppEnv } from "@repo/config";
import { stripe } from "@/lib/services/stripe";
import type Stripe from "stripe";
import { priceItems } from "@repo/pricing";
import type { User } from "@repo/schemas";
import { UserModel } from "@repo/models";

const endpointSecret = getAppEnv().STRIPE_WEBHOOK_SECRET;

export async function POST({ request }: RequestEvent) {
	const payload = await request.text();
	const sig = request.headers.get("stripe-signature");

	if (!sig) {
		return json({ error: "Missing stripe-signature header" }, { status: 400 });
	}

	try {
		const event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		console.log("Webhook event received:", event.type);

		switch (event.type) {
			case "checkout.session.completed": {
				const session = event.data.object as Stripe.Checkout.Session;
				console.log("Checkout completed:", session.id);

				if (session.subscription) {
					try {
						const subscriptionId =
							typeof session.subscription === "string"
								? session.subscription
								: session.subscription.id;

						console.log("Fetching subscription details for:", subscriptionId);
						const subscription = await stripe.subscriptions.retrieve(subscriptionId);

						// If user_id isn't in subscription metadata, get it from the customer
						if (!subscription.metadata?.user_id && session.customer) {
							const customerId =
								typeof session.customer === "string" ? session.customer : session.customer.id;

							console.log("Adding customer info to subscription:", customerId);
							await stripe.subscriptions.update(subscriptionId, {
								metadata: {
									...subscription.metadata,
									user_id: session.client_reference_id || customerId
								}
							});
						}

						await updateUserSubscription(subscription);
					} catch (error) {
						console.error("Error processing checkout subscription:", error);
					}
				}
				break;
			}

			case "customer.subscription.created":
			case "customer.subscription.updated":
			case "customer.subscription.deleted": {
				const subscription = event.data.object as Stripe.Subscription;
				console.log("Processing subscription event:", event.type, "Status:", subscription.status);
				await updateUserSubscription(subscription);
				console.log("Subscription updated:", subscription.id);
				break;
			}

			case "invoice.payment_succeeded":
			case "invoice.payment_failed": {
				const invoice = event.data.object as Stripe.Invoice;

				// For invoice events, we just update the subscription data
				if (invoice.subscription) {
					try {
						const subscription = await stripe.subscriptions.retrieve(
							typeof invoice.subscription === "string"
								? invoice.subscription
								: invoice.subscription.id
						);
						await updateUserSubscription(subscription);
					} catch (error) {
						console.error("Error handling invoice payment:", error);
					}
				}
				console.log("Invoice payment processed:", invoice.id);
				break;
			}
		}

		return json({ received: true }, { status: 200 });
	} catch (err) {
		console.error("Webhook Error:", err);
		return json({ error: (err as Error).message }, { status: 400 });
	}
}

async function updateUserSubscription(subscription: Stripe.Subscription) {
	try {
		// Get user ID from metadata or customer ID
		const userId =
			subscription.metadata?.user_id ||
			(subscription.customer
				? typeof subscription.customer === "string"
					? subscription.customer
					: subscription.customer.id
				: null);

		if (!userId) {
			console.error("No user ID found for subscription:", subscription.id);
			return;
		}

		const { price_id } = subscription.metadata;
		const price = priceItems[price_id];

		if (!price) {
			console.error("No price found for subscription:", subscription.id);
			return;
		}

		// If the subscription is canceled, remove the subscription from the user
		if (subscription.status === "canceled") {
			console.log("Subscription canceled:", subscription.id);
			await UserModel.deleteField(userId, "subscription");
			return;
		}

		// Update user with subscription data
		await UserModel.update(userId, {
			subscription: {
				stripe_subscription_id: subscription.id,
				stripe_customer_id:
					typeof subscription.customer === "string"
						? subscription.customer
						: subscription.customer.id,
				status: subscription.status,
				plan_name: price.product_name || "Unknown Plan",
				current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
				cancel_at_period_end: subscription.cancel_at_period_end
			} as User["subscription"]
		});

		console.log("User subscription updated successfully:", userId, "Status:", subscription.status);
		console.log("Cancel at period end:", subscription.cancel_at_period_end);
	} catch (error) {
		console.error("Error updating user subscription:", error);
		console.error(error instanceof Error ? error.message : String(error));
	}
}
