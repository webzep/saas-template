import { z } from "zod";

export type Provider = "google" | "github" | "twitter" | "facebook";

export type Role = "USER" | "ADMIN";

export const themeSchema = z.union([z.literal("light"), z.literal("dark"), z.literal("system")]);
export type Theme = z.infer<typeof themeSchema>;

export const userSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string().email(),
	image: z.string().url(),
	roles: z.array(z.union([z.literal("USER"), z.literal("ADMIN")])),
	preferences: z.object({
		font_scale: z.number(),
		theme: themeSchema
	}),
	providers: z.record(z.string()),
	subscription: z
		.object({
			stripe_subscription_id: z.string().optional(),
			stripe_customer_id: z.string().optional(),
			status: z
				.union([
					z.literal("active"),
					z.literal("inactive"),
					z.literal("canceled"),
					z.literal("past_due"),
					z.literal("incomplete"),
					z.literal("incomplete_expired"),
					z.literal("trialing"),
					z.literal("unpaid")
				])
				.optional(),
			plan_name: z.string().optional(),
			current_period_end: z.string().datetime().optional(),
			cancel_at_period_end: z.boolean().optional()
		})
		.optional(),
	created_at: z.string().datetime(),
	updated_at: z.string().datetime()
});

export type User = z.infer<typeof userSchema>;
