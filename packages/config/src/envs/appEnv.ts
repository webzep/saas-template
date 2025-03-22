import {
	APP_URL,
	AUTH_GITHUB_ID,
	AUTH_GITHUB_SECRET,
	AUTH_SECRET,
	FIREBASE_CLIENT_EMAIL,
	FIREBASE_PRIVATE_KEY,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	NODE_ENV,
	STRIPE_SECRET_KEY,
	STRIPE_WEBHOOK_SECRET,
	WEBSITE_URL
} from "$env/static/private";

// Expected env keys for the app:
const appEnvKeys = [
	"APP_URL",
	"AUTH_GITHUB_ID",
	"AUTH_GITHUB_SECRET",
	"AUTH_SECRET",
	"FIREBASE_CLIENT_EMAIL",
	"FIREBASE_PRIVATE_KEY",
	"FIREBASE_PROJECT_ID",
	"FIREBASE_STORAGE_BUCKET",
	"NODE_ENV",
	"STRIPE_SECRET_KEY",
	"STRIPE_WEBHOOK_SECRET",
	"WEBSITE_URL"
] as const;

type AppEnvKeys = (typeof appEnvKeys)[number];

export type AppEnv = {
	[T in AppEnvKeys]: string;
};

export const getAppEnv = (): AppEnv => {
	const env: AppEnv = {
		APP_URL: APP_URL ?? "",
		AUTH_GITHUB_ID: AUTH_GITHUB_ID ?? "",
		AUTH_GITHUB_SECRET: AUTH_GITHUB_SECRET ?? "",
		AUTH_SECRET: AUTH_SECRET ?? "",
		FIREBASE_CLIENT_EMAIL: FIREBASE_CLIENT_EMAIL ?? "",
		FIREBASE_PRIVATE_KEY: FIREBASE_PRIVATE_KEY ?? "",
		FIREBASE_PROJECT_ID: FIREBASE_PROJECT_ID ?? "",
		FIREBASE_STORAGE_BUCKET: FIREBASE_STORAGE_BUCKET ?? "",
		NODE_ENV: NODE_ENV ?? "",
		STRIPE_SECRET_KEY: STRIPE_SECRET_KEY ?? "",
		STRIPE_WEBHOOK_SECRET: STRIPE_WEBHOOK_SECRET ?? "",
		WEBSITE_URL: WEBSITE_URL ?? ""
	};

	const missingKeys = Object.entries(env)
		.filter(([, value]) => !value)
		.map(([key]) => key);

	if (missingKeys.length > 0) {
		throw new Error(`App env: Missing environment variables: ${missingKeys.join(", ")}`);
	}

	return env;
};
