import { type User, userSchema } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";

const users = db<User>(Collection.USERS);

const updatePreferencesHandler: TRPCProcedure<
	Partial<User["preferences"]>,
	Partial<User["preferences"]>
> = async ({ ctx, input }) => {
	const userId = ctx.session.user.id;

	if (!userId) {
		return {
			success: false,
			message: "You must be logged in to update your preferences."
		};
	}

	try {
		const success = await users.update(userId, {
			preferences: input
		});

		return {
			success,
			data: input
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: "Could not get available reels. Try again later."
		};
	}
};

export const updatePreferences = protectedProcedure
	.input(userSchema.shape.preferences.partial())
	.mutation(updatePreferencesHandler);
