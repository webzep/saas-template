import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
	server: {
		host: true,
		https: true, // TODO Work out the correct typing
		port: 5101
	},
	plugins: [sveltekit(), basicSsl()]
});
