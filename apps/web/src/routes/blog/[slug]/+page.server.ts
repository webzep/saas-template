import { makeFetchData } from "@/lib/storyblok/helpers/makeFetchData";
import type { BlogStoryblok } from "@/types/storyblok";
import { getConfig } from "@repo/config";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const fetchBlog = makeFetchData<BlogStoryblok>("blog", {
	version: getConfig().mode.prod ? "published" : "draft"
});

export const load: PageServerLoad = async ({ params }) => {
	const data = await fetchBlog(params.slug).catch(() => null);

	if (!data) return redirect(303, "/blog");

	const story = data.story;

	return {
		story
	};
};
