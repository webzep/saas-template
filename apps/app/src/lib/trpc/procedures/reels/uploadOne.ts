import { fileSchema, type File } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";

// TODO: Sort out all the reels and uploads endpoints
const uploadOneHandler: TRPCProcedure<Pick<File, "file_name">, File> = async ({ ctx, input }) => {
	try {
		const userId = ctx.session.user.id;

		if (!userId) {
			return {
				success: false,
				message: "You must be logged in to upload a reel."
			};
		}

		// const reelsCollection = db<File>(Collection.UPLOADS);

		// Create a new reel document
		// console.log("Creating a doc id");
		// const docId = await reelsCollection.createEmpty();
		// console.log("🚀 ~ docId:", docId);
		// const document: File = {
		// 	created_at: new Date().toISOString(),
		// 	id: docId,
		// 	owner_id: userId,
		// 	file_name: input.file_name,
		// 	updated_at: new Date().toISOString()
		// };
		// console.log("🚀 ~ document:", document);
		// await reelsCollection.set(docId, document);

		return {
			success: true,
			data: document
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: "Could not get available reels. Try again later."
		};
	}
};

export const uploadOne = protectedProcedure
	.input(fileSchema.pick({ reel_file_name: true }))
	.mutation(uploadOneHandler);
