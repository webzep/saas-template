import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		host: "0.0.0.0",
		port: 5101
	},
	preview: {
		allowedHosts: ["skulltag.io"],
		host: "0.0.0.0"
	},
	plugins: [sveltekit()]
});
