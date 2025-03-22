import type { Context, ProtectedContext } from "@/lib/trpc/context";
import { t } from "@/lib/trpc/trpc";
import { user } from "@/lib/trpc/procedures/user";
import { reels } from "@/lib/trpc/procedures/reels";
import { upload } from "@/lib/trpc/procedures/upload";
import { subscriptions } from "@/lib/trpc/procedures/subscriptions";

export type TRPCProcedure<Input, Output> = (props: {
	ctx: ProtectedContext;
	input: Input;
}) => Promise<{
	data?: Output;
	success: boolean;
	message?: string;
}>;

export const router = t.router({
	upload,
	reels,
	subscriptions,
	user
});

export type Router = typeof router;
