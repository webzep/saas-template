import type { File } from "@repo/schemas";
import { Collection, db } from "@repo/firebase";

export const FileModel = {
	...db<File>(Collection.UPLOADS)
};
