import Blog from "@/lib/storyblok/ui/SbBlog.svelte";
import Page from "@/lib/storyblok/ui/SbPage.svelte";
import { getWebsiteEnv } from "@repo/config/website";
import {
	type SbSvelteComponentsMap,
	apiPlugin,
	storyblokInit,
	useStoryblokApi
} from "@storyblok/svelte";

const env = getWebsiteEnv();

storyblokInit({
	accessToken: env.STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	apiOptions: {
		https: true,
		region: "ap"
	},
	components: {
		blog: Blog,
		page: Page
	} as unknown as SbSvelteComponentsMap // Temporary until https://github.com/storyblok/storyblok-svelte/pull/1127 is merged
});

export const storyblokApi = useStoryblokApi();
