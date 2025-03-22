import type { RichtextStoryblok } from "@/types/storyblok";

export const calculateReadTime = (richtext: RichtextStoryblok | undefined) => {
	try {
		if (!richtext?.content) {
			return null;
		}

		const readTime = richtext.content.reduce((acc: number, node) => {
			const entries = node.content;
			if (!entries) {
				return acc;
			}
			// Sum the words of the text attribute for each entry if the text prop exists
			entries.forEach((entry) => {
				if (entry.text) {
					acc += entry.text.split(" ").length;
				}
			});

			return acc;
		}, 0);

		return readTime ? `${Math.ceil(readTime / 200)} min read` : "";
	} catch (error) {
		return null;
	}
};

export const createPublishAndReadTimeTagline = (
	publishedAt: string | null,
	readTime: RichtextStoryblok | undefined
) => {
	const publishedTime = publishedAt
		? new Date(publishedAt).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric"
			})
		: false;

	const readTimeText = calculateReadTime(readTime);

	return [publishedTime, readTimeText].filter(Boolean).join(" • ");
};
