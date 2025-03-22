import { type File, fileSchema } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";
import { z } from "zod";

const inputSchema = z.object({
	target: z.string(),
	data: fileSchema
		.pick({
			file_name: true,
			status: true
		})
		.partial()
});

type Input = z.infer<typeof inputSchema>;

const updateUploadHandler: TRPCProcedure<Input, File> = async ({ ctx, input }) => {
	try {
		const { target, data } = input;

		// Ensure its the user's file
		const file = await db<File>(Collection.UPLOADS).find(target);
		if (!file || file.owner_id !== ctx.session.user.id) {
			console.log(
				`File not found or not owned by user. User: ${ctx.session.user.id}, Target: ${target}`
			);

			return { success: false, message: "File not found." };
		}

		const payload: Partial<File> = {
			...data,
			updated_at: new Date().toISOString()
		};

		const docUpdated = await db<File>(Collection.UPLOADS).update(target, payload);

		if (!docUpdated) {
			return {
				success: false,
				message: "Could not update the file. Try again later."
			};
		}

		const updatedFile: File = { ...file, ...payload };

		return {
			success: true,
			data: updatedFile
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "Could not update the file. Try again later."
		};
	}
};

export const updateUpload = protectedProcedure.input(inputSchema).mutation(updateUploadHandler);
