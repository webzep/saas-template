import type { File } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";

// TODO: Create an index for the ownerId field in the reels collection
const getUploadedHandler: TRPCProcedure<void, File[]> = async ({ ctx }) => {
	try {
		const userId = ctx.session.user.id;
		const reelsCollection = db<File>(Collection.UPLOADS);
		const reels = await reelsCollection.findWhere("owner_id", userId);

		return {
			success: true,
			data: reels
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: "Could not get available reels. Try again later."
		};
	}
};

export const getUploaded = protectedProcedure.query(getUploadedHandler);
