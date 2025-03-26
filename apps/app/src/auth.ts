import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import { UserModel } from "@repo/models";
import { getAppEnv } from "@repo/config/app";

const env = getAppEnv();

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [
		GitHub({
			clientId: env.AUTH_GITHUB_ID,
			clientSecret: env.AUTH_GITHUB_SECRET
		})
	],
	callbacks: {
		signIn: async ({ account, user }) => {
			if (!account || !user) return false;

			// Create a user document if it doesnt exist
			const accountId = UserModel.composeAccountId(account);
			const userDoc = await UserModel.find(accountId);

			if (!userDoc) {
				const newUser = UserModel.createUserDefaults({
					id: accountId,
					name: user.name || "",
					email: user.email || "",
					image: user.image || ""
				});

				const userCreated = await UserModel.set(accountId, newUser);
				if (!userCreated) return false;
			}

			return true;
		},
		async jwt({ token, account }) {
			if (account && !token.id) {
				token.id = UserModel.composeAccountId(account);
			}
			return token;
		},
		async session({ session, token }) {
			if (!session.user.id && token.id) {
				session.user.id = token.id as string;
			}

			return session;
		}
	}
});
