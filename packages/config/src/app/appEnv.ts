import { config } from "dotenv";

config();

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
	"ENVIRONMENT",
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
		APP_URL: process.env.APP_URL ?? "",
		AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID ?? "",
		AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET ?? "",
		AUTH_SECRET: process.env.AUTH_SECRET ?? "",
		FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL ?? "",
		FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY ?? "",
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID ?? "",
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET ?? "",
		ENVIRONMENT: process.env.ENVIRONMENT ?? "",
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ?? "",
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
		WEBSITE_URL: process.env.WEBSITE_URL ?? ""
	};

	const missingKeys = Object.entries(env)
		.filter(([, value]) => !value)
		.map(([key]) => key);

	if (missingKeys.length > 0) {
		throw new Error(`App env: Missing environment variables: ${missingKeys.join(", ")}`);
	}

	return env;
};
