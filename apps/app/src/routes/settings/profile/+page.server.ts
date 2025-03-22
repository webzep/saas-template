// Pass the user preferences to the frontend

import { UserModel } from "@repo/models";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const session = await event.locals.auth();

	if (!session?.user?.id) {
		return fail(401, { type: "error", error: "Unauthenticated" });
	}

	const profile = await UserModel.find(session.user.id).then((user) => ({
		name: user.name,
		email: user.email,
		image: user.image
	}));

	return {
		session,
		profile
	};
};
