import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import { UserModel } from "@repo/models";

export const { handle, signIn, signOut } = SvelteKitAuth({
	trustHost: true,
	providers: [
		// Apple,
		// Auth0,
		// AzureB2C({
		//   clientId: env.AUTH_AZURE_AD_B2C_ID,
		//   clientSecret: env.AUTH_AZURE_AD_B2C_SECRET,
		//   issuer: env.AUTH_AZURE_AD_B2C_ISSUER,
		// }),
		// BoxyHQSAML({
		//   clientId: "dummy",
		//   clientSecret: "dummy",
		//   issuer: env.AUTH_BOXYHQ_SAML_ISSUER,
		// }),
		// Cognito,
		// Coinbase,
		// Discord,
		// Dropbox,
		// Facebook,
		GitHub
		// GitLab,
		// Google,
		// Hubspot,
		// Keycloak,
		// LinkedIn,
		// Netlify,
		// Okta,
		// Passage,
		// Pinterest,
		// Reddit,
		// Slack,
		// Spotify,
		// Twitch,
		// Twitter,
		// WorkOS({ connection: env.AUTH_WORKOS_CONNECTION! }),
		// Zoom,
	],
	callbacks: {
		signIn: async ({ account, user }) => {
			if (!account || !user) return false;

			// Create a user document if it doesnt exist
			const accountId = UserModel.composeAccountId(account);
			const userDoc = await UserModel.find(accountId).catch(() => null);

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
