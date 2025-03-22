import { type File, fileSchema } from "@repo/schemas";
import { Collection, db, storage } from "@repo/firebase";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";
import { z } from "zod";

const inputSchema = fileSchema.pick({
	content_type: true,
	file_name: true,
	size: true
});

type Input = z.infer<typeof inputSchema>;

const outputSchema = z.object({
	id: z.string(),
	uploadUrl: z.string()
});

type Output = z.infer<typeof outputSchema>;

const getSignedUploadUrlHandler: TRPCProcedure<Input, Output> = async ({ ctx, input }) => {
	try {
		// Create a document in Firestore to store the file metadata.
		const fileId = await db<File>(Collection.UPLOADS).createEmpty();
		const filePath = `uploads/${ctx.session.user.id}/${fileId}`;
		const payload: File = {
			content_type: input.content_type,
			created_at: new Date().toISOString(),
			file_name: input.file_name,
			id: fileId,
			owner_id: ctx.session.user.id,
			path: filePath,
			size: input.size,
			status: "PENDING",
			storage: "FIREBASE",
			updated_at: new Date().toISOString()
		};

		const docCreated = await db<File>(Collection.UPLOADS).update(fileId, payload);

		if (!docCreated) {
			return {
				success: false,
				message: "Could not upload the file. Try again later."
			};
		}

		// Create a file reference in the bucket, e.g. include the user ID in the path.
		const bucket = storage.bucket();
		const file = bucket.file(filePath);

		// Generate a pre-signed URL for uploading (write access), valid for 5 minutes.
		const expiresWrite = Date.now() + 60 * 1000 * 5;
		const optionsWrite = {
			action: "write" as const,
			contentType: input.content_type,
			expires: expiresWrite,
			version: "v4" as const
		};
		const [uploadUrl] = await file.getSignedUrl(optionsWrite);

		return {
			success: true,
			data: { id: fileId, uploadUrl }
		};
	} catch (error) {
		console.error(error);
		return {
			success: false,
			message: "Could not generate upload URL. Try again later."
		};
	}
};

export const getSignedUploadUrl = protectedProcedure
	.input(
		fileSchema.pick({
			content_type: true,
			file_name: true,
			size: true
		})
	)
	.query(getSignedUploadUrlHandler);
