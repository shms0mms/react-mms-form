import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import dts from "vite-plugin-dts"
import path from "path"

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
		},
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, "./src/index.ts"),
			name: "react-mms-form",
			fileName: format => `index.${format}.js`,
		},

		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
		sourcemap: true,
		emptyOutDir: true,
	},
	plugins: [react(), dts()],
})
