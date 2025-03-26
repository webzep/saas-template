import { config } from "dotenv";

config();

export const getConfig = () => {
	return {
		name: "SkullTag",
		contact: {
			supportEmail: "support@mail.skulltag.app",
			steveEmail: "steve@mail.skulltag.app"
		},
		mode: {
			dev: process.env.NODE_ENV === "development",
			prod: process.env.NODE_ENV === "production",
			staging: process.env.NODE_ENV === "staging",
			test: process.env.NODE_ENV === "test"
		},
		social: {
			facebook: "https://www.facebook.com/skulltag",
			instagram: "https://www.instagram.com/skulltag",
			linkedin: "https://www.linkedin.com/company/skulltag",
			x: "https://www.x.com/skulltag"
		}
	};
};
