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
			dev: process.env.ENVIRONMENT === "development",
			prod: process.env.ENVIRONMENT === "production",
			staging: process.env.ENVIRONMENT === "staging",
			test: process.env.ENVIRONMENT === "test"
		},
		social: {
			facebook: "https://www.facebook.com/skulltag",
			instagram: "https://www.instagram.com/skulltag",
			linkedin: "https://www.linkedin.com/company/skulltag",
			x: "https://www.x.com/skulltag"
		}
	};
};
