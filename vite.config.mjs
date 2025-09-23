import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { sveltePreprocess } from 'svelte-preprocess'

export default defineConfig({
	root: 'src',
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				typescript: {
					tsconfigFile: './tsconfig.json'
				}
			})
		})
	],
	build: {
		outDir: '../public/static',
		rollupOptions: {
			input: 'src/main.ts',
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
