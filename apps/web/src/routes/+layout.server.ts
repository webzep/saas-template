import { getConfig, getWebsiteEnv } from "@repo/config";
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
