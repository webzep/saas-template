import { z } from "zod";

export const newsletterSchema = z.object({
	created_at: z.string(),
	email: z.string(),
	updated_at: z.string()
});

export type Newsletter = z.infer<typeof newsletterSchema>;
