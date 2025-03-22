import { getAppEnv } from "@repo/config";
import Stripe from "stripe";

export const stripe = new Stripe(getAppEnv().STRIPE_SECRET_KEY, {
	apiVersion: "2025-02-24.acacia"
});
