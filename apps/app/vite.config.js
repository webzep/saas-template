import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig(() => {
	return {
		server: {
			host: "0.0.0.0",
			port: 5100
		},
		preview: {
			allowedHosts: ["app.skulltag.io"],
			host: "0.0.0.0"
		},
		plugins: [sveltekit()]
	};
});
