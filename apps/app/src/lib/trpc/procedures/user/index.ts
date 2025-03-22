import { t } from "@/lib/trpc/trpc";
import { updatePreferences } from "@/lib/trpc/procedures/user/preferences";
import { getSubscription } from "@/lib/trpc/procedures/user/getSubscription";

export const user = t.router({
	updatePreferences,
	getSubscription
});
