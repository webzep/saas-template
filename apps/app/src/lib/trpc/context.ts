import type { Session, User } from "@auth/sveltekit";
import type { RequestEvent } from "@sveltejs/kit";
import type { inferAsyncReturnType } from "@trpc/server";

const assertSessionHasUserAndId = (
	session: Session | null
): session is Session & { user: User; userId: string } => {
	return !!session?.user?.id;
};

export const createContext = async (event: RequestEvent) => {
	const session = await event.locals.auth();

	if (!assertSessionHasUserAndId(session)) {
		throw new Error("You must be logged in to access this resource.");
	}

	return { session };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export type ProtectedContext = Context & {
	session: Session & {
		user: User & { id: string };
		userId: string;
	};
};
