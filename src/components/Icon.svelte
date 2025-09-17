<script lang="ts">
	import { svgCache, pendingFetches } from '../services/iconCache.js'

	export let name: string
	export let className: string = ''
	export let alt: string = ''

	let svgContent: string = ''
	let hasError: boolean = false

	$: if (name) {
		hasError = false

		if (svgCache.has(name)) {
			const cachedSvg = svgCache.get(name)
			svgContent = modifySvg(cachedSvg, className, alt)
		}
		else if (pendingFetches.has(name)) {
			pendingFetches.get(name)?.then((svg: string) => {
				svgContent = modifySvg(svg, className, alt)
			})
		}
		else {
			const fetchPromise = fetch(`/assets/images/icons/${name}.svg`)
				.then(res => {
					if (!res.ok) {
						throw new Error
					}
					return res.text()
				})
				.then(text => {
					svgCache.set(name, text)
					pendingFetches.delete(name)
					return text
				})
				.catch(error => {
					console.warn(`Error: Icon "${name}" not found`)
					hasError = true
					svgContent = ''
					pendingFetches.delete(name)
					throw error
				})

			pendingFetches.set(name, fetchPromise)

			fetchPromise.then((svg: string) => {
				svgContent = modifySvg(svg, className, alt)
			})
		}
	}

	function modifySvg(svg: string, className: string, alt: string): string {
		let modifiedSvg = svg.replace('<svg ', `<svg class="${className}" `)

		if (alt) {
			modifiedSvg = modifiedSvg.replace('<svg ', `<svg aria-label="${alt}" `)
		} else {
			modifiedSvg = modifiedSvg.replace('<svg ', `<svg aria-hidden="true" `)
		}

		return modifiedSvg
	}
</script>

{#if hasError}
	<svg xmlns="http://www.w3.org/2000/svg" class={className} aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="M12 19C12.8284 19 13.5 19.6716 13.5 20.5C13.5 21.3284 12.8284 22 12 22C11.1716 22 10.5 21.3284 10.5 20.5C10.5 19.6716 11.1716 19 12 19ZM12 2C15.3137 2 18 4.68629 18 8C18 10.1646 17.2474 11.2907 15.3259 12.9231C13.3986 14.5604 13 15.2969 13 17H11C11 14.526 11.787 13.3052 14.031 11.3989C15.5479 10.1102 16 9.43374 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V9H6V8C6 4.68629 8.68629 2 12 2Z"></path></svg>
{:else}
	{@html svgContent}
{/if}
