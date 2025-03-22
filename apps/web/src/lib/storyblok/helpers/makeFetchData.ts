import type { AuthorStoryblok } from "@/types/storyblok";
import { getStoryblokApi, type ISbStoryData } from "@storyblok/svelte";

type RelationKey = "author"; // Add more relations such as "products"
const relations: RelationKey[] = ["author"];

export type ContentWithStoryMeta<T> = T & {
	author?: AuthorStoryblok;
	story: {
		uuid: string;
		slug: string;
		name: string;
		created_at: string;
		published_at: string | null;
		first_published_at?: string | null;
	};
};

type StoryResult<T> = {
	story: ISbStoryData<ContentWithStoryMeta<T>>;
	rels?: AuthorStoryblok[]; // Add more relations e.g (AuthorStoryblok | ProductStoryblok)[];
};

type FetchDataOptions = {
	cache?: "default" | "no-cache";
	version?: "draft" | "published";
};

export const makeFetchData =
	<T>(root: string, options: FetchDataOptions = { cache: "default", version: "published" }) =>
	async (
		slug: string | string[],
		overrideOptions?: FetchDataOptions
	): Promise<StoryResult<T> | null> => {
		const storyblokApi = getStoryblokApi();

		if (!storyblokApi) return null;

		const userData = await storyblokApi.get("cdn/spaces/me", {});
		const spaceData = userData.data.space;
		const { version: storyblokCacheVersion } = spaceData;
		storyblokApi.setCacheVersion(storyblokCacheVersion);

		const resolvedVersion = overrideOptions?.version || options.version;

		const path = Array.isArray(slug) ? slug.join("/") : slug;

		const { data } = (await storyblokApi.get(
			`cdn/stories/${root}/${path}`,
			{
				version: resolvedVersion,
				cv: Date.now(),
				// cv: storyblokCacheVersion,
				resolve_relations: relations
			},
			{ cache: overrideOptions?.cache || options.cache }
		)) as {
			data: StoryResult<T> | null;
		};

		if (!data?.story?.content) return null;

		// Add story data to the blok
		data.story.content.story = data.story;

		// Map relation IDs to related objects
		relations.forEach((relation) => {
			const relationIds = data.story?.content?.[relation] || [];

			if (data.story.content[relation] === undefined) return;

			data.story.content[relation] = relationIds.map((id: string) =>
				(data.rels ?? []).find(({ uuid }) => uuid === id)
			);
		});

		return data;
	};
