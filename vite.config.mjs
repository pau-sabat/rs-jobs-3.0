import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
	root: 'src',
	plugins: [
		svelte({
			preprocess: {
				typescript: true
			}
		})
	],
	build: {
		outDir: '../public/static',
		rollupOptions: {
			input: 'src/main.js',
			output: {
				entryFileNames: 'bundle.js',
				chunkFileNames: 'bundle.js',
				assetFileNames: 'bundle.[ext]',
			},
		},
	},
	server: {
		port: 5173,
	},
	resolve: {
		alias: {
			'$lib': '/src/lib',
			'$app': '/src/app'
		}
	}
})
