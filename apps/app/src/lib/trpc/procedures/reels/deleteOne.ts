import { fileSchema, type File } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";

const deleteOneHandler: TRPCProcedure<Pick<File, "id">, Pick<File, "id">> = async ({
	ctx,
	input
}) => {
	try {
		const userId = ctx.session.user.id;

		const reelsCollection = db<File>(Collection.UPLOADS);

		const reel = await reelsCollection.find(input.id);

		if (reel.owner_id !== userId) {
			return {
				success: false,
				message: "You do not have permission to delete this reel."
			};
		}

		const success = await reelsCollection.delete(input.id);

		if (!success) {
			return {
				success: false,
				message: "Could not delete the reel. Try again later."
			};
		}

		return {
			success,
			message: "Reel deleted successfully.",
			data: { id: input.id }
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: "Could not delete the reel. Try again later."
		};
	}
};

export const deleteOne = protectedProcedure
	.input(fileSchema.pick({ id: true }))
	.mutation(deleteOneHandler);
