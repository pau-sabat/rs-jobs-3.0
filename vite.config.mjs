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
			}),
			compilerOptions: {
				customElement: true
			}
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
		watch: {
			// Excluir archivos generados para evitar bucles infinitos
			exclude: ['**/node_modules/**', '**/public/static/**', '**/public/css/output.css']
		}
	},
	server: {
		port: 5173,
		watch: {
			// Excluir archivos que pueden causar bucles infinitos
			exclude: ['**/node_modules/**', '**/public/static/**', '**/public/css/output.css']
		}
	},
	resolve: {
		alias: {
			'$lib': '/src/lib',
			'$app': '/src/app'
		}
	}
})
