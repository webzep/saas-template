import type { File } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";

export const NewsletterModel = {
	...db<File>(Collection.NEWSLETTER)
};
