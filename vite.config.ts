// vite.config.ts
import react from "@vitejs/plugin-react"
import { resolve } from "path"
export default {
	plugins: [react()],

	build: {
		lib: {
			entry: resolve(__dirname, "src/index.ts"),
			name: "ReactMmsForm",
			fileName: "react-mms-form",
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
	},
}
