import { storyblokApi } from "@/lib/storyblok/storyblokApi";
import type { BlogStoryblok } from "@/types/storyblok";
import type { ISbStoryData } from "@storyblok/svelte";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ params }) => {
	// Get others for the more blogs section
	const limit = 6;
	const { data } = await storyblokApi
		.get("cdn/stories", {
			starts_with: "blog",
			per_page: limit + 1, // +1 incase the current story is returned in the list
			sort_by: "first_published_at:desc",
			version: "published"
		})
		.catch(() => ({ data: { stories: [] } }));

	const stories: ISbStoryData<BlogStoryblok>[] = data.stories;
	const otherStories = stories.filter((story) => story.slug !== params.slug).slice(0, limit);

	return {
		otherStories
	};
};
