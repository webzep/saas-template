import { z } from "zod";

export const fileSchema = z.object({
	content_type: z.string(),
	created_at: z.string(),
	file_name: z.string(),
	id: z.string(),
	owner_id: z.string(),
	path: z.string(),
	size: z.number(),
	status: z.union([z.literal("PENDING"), z.literal("UPLOADED")]),
	storage: z.literal("FIREBASE"),
	updated_at: z.string()
});

export type File = z.infer<typeof fileSchema>;
