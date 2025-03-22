import { t } from "@/lib/trpc/trpc";
import { getUploaded } from "@/lib/trpc/procedures/reels/getUploaded";
import { deleteOne } from "@/lib/trpc/procedures/reels/deleteOne";
import { uploadOne } from "@/lib/trpc/procedures/reels/uploadOne";

export const reels = t.router({
	getUploaded,
	deleteOne,
	uploadOne
});
