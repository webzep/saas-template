import { getConfig } from "@repo/config";
import { getWebsiteEnv } from "@repo/config/website";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
	const env = getWebsiteEnv();
	const config = getConfig();

	return {
		appURL: env.APP_URL,
		websiteURL: env.WEBSITE_URL,
		config
	};
};
