import { type User, userSchema } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";
import type { TRPCProcedure } from "@/lib/trpc/router";
import { protectedProcedure } from "@/lib/trpc/trpc";

const users = db<User>(Collection.USERS);

const getSubscriptionHandler: TRPCProcedure<undefined, Partial<User["subscription"]>> = async ({
	ctx
}) => {
	const userId = ctx.session.user.id;

	try {
		const user = await users.find(userId);

		return {
			success: true,
			data: user.subscription
		};
	} catch (error) {
		console.error(error);

		return {
			success: false,
			message: "Could not get available reels. Try again later."
		};
	}
};

export const getSubscription = protectedProcedure.query(getSubscriptionHandler);
