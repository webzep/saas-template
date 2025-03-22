import { getSignedUploadUrl } from "@/lib/trpc/procedures/upload/getSignedUploadUrl";
import { updateUpload } from "@/lib/trpc/procedures/upload/updateUpload";
import { t } from "@/lib/trpc/trpc";

export const upload = t.router({
	getSignedUploadUrl,
	updateUpload
});
