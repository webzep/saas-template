import type { Context, ProtectedContext } from "@/lib/trpc/context";
import { initTRPC, TRPCError } from "@trpc/server";

export const t = initTRPC.context<Context>().create();

// Ensure user session is available in TRPC context
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
	if (!ctx.session.user?.id) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You must be logged in to access this resource."
		});
	}

	// Ensure user id is available in TRPC context
	const context: ProtectedContext = {
		...ctx,
		session: {
			...ctx.session,
			user: {
				...ctx.session.user,
				id: ctx.session.user.id
			},
		}
	};

	return next({ ctx: context });
});
