import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { UserModel } from "@repo/models";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (!session?.user?.id) {
		throw redirect(302, "/login");
	}

	try {
		// Get user with their subscription data
		const user = await UserModel.find(session.user.id);

		return { userSubscription: user.subscription };
	} catch (error) {
		console.error("Error loading subscription data:", error);
		return { user: { subscription: undefined } };
	}
};
