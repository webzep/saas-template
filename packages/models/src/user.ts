import type { User } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";
import type { Account } from "@auth/sveltekit";

type CreateUserDefaultsParams = { id: string; name: string; email: string; image: string };

const createUserDefaults = ({ id, name, email, image }: CreateUserDefaultsParams) => {
	const provider = id.split(":")[0];
	const providerAccountId = id.split(":")[1];
	return {
		name,
		email,
		image,
		roles: ["USER"],
		preferences: { font_scale: "1.6", theme: "system" },
		providers: { [provider]: providerAccountId }
	};
};

const composeAccountId = (account: Account) => `${account.provider}:${account.providerAccountId}`;

const decomposeAccountId = (accountId: string) => {
	const [provider, providerAccountId] = accountId.split(":");
	return { provider, providerAccountId };
};

export const UserModel = {
	...db<User>(Collection.USERS),
	createUserDefaults,
	composeAccountId,
	decomposeAccountId
};
