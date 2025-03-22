import { NODE_ENV } from "$env/static/private";

export const getConfig = () => {
	return {
		name: "SkullTag",
		contact: {
			supportEmail: "support@mail.skulltag.app",
			steveEmail: "steve@mail.skulltag.app"
		},
		mode: {
			dev: NODE_ENV === "development",
			prod: NODE_ENV === "production",
			staging: NODE_ENV === "staging",
			test: NODE_ENV === "test"
		},
		social: {
			facebook: "https://www.facebook.com/skulltag",
			instagram: "https://www.instagram.com/skulltag",
			linkedin: "https://www.linkedin.com/company/skulltag",
			x: "https://www.x.com/skulltag"
		}
	};
};
