import { storyblokApi } from "@/lib/storyblok/storyblokApi";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const dataStory = await storyblokApi.get("cdn/stories/home", {
		version: "draft"
	});

	return {
		story: dataStory.data.story
	};
};
