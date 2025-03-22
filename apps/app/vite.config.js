import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
	server: {
		host: true,
		port: 5100
	},
	plugins: [sveltekit()]
});
