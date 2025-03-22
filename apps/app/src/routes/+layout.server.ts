import { UserModel } from "@repo/models";
import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

// This function is called on every page load so every page has access to
// the session data. But this is only called on the server side.
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
