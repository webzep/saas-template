import type { Actions } from "./$types";

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const name = data.get("name");
		const msg = data.get("message");

		return {
			success: true,
			result: `Hello ${name}, we got your message: ${msg}`
		};
	}
} satisfies Actions;
