import { UserModel } from "@repo/models";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.auth();

	let user = null;

	if (session?.user?.id) {
		try {
			user = await UserModel.find(session.user.id);
		} catch (error) {
			console.error(error);
			throw redirect(302, "/signin");
		}
	}

	return {
		session: await event.locals.auth(),
		user
	};
};
