import { APP_URL, NODE_ENV, STORYBLOK_ACCESS_TOKEN, WEBSITE_URL } from "$env/static/private";

const websiteEnvKeys = ["APP_URL", "STORYBLOK_ACCESS_TOKEN", "WEBSITE_URL", "NODE_ENV"] as const;

type WebsiteEnvKeys = (typeof websiteEnvKeys)[number];

export type WebsiteEnv = {
	[T in WebsiteEnvKeys]: string;
};

export const getWebsiteEnv = (): WebsiteEnv => {
	const env: WebsiteEnv = {
		APP_URL: APP_URL ?? "",
		NODE_ENV: NODE_ENV ?? "",
		STORYBLOK_ACCESS_TOKEN: STORYBLOK_ACCESS_TOKEN ?? "",
		WEBSITE_URL: WEBSITE_URL ?? ""
	};

	const missingKeys = Object.entries(env)
		.filter(([, value]) => !value)
		.map(([key]) => key);

	if (missingKeys.length > 0) {
		throw new Error(`Web env: Missing environment variables: ${missingKeys.join(", ")}`);
	}

	return env;
};
