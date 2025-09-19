<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { backdropService } from '../services/backdropService'

	let visible = false
	let zIndex = 40
	let unsubscribe: (() => void) | null = null

	onMount(() => {
		unsubscribe = backdropService.subscribe(state => {
			visible = state.visible
			zIndex = state.zIndex

			if (visible) {
				document.body.style.overflow = 'hidden'
			} else {
				document.body.style.overflow = 'auto'
			}
		})

		// expose in window
		// ;(window as any).Backdrop = backdropService
	})

	onDestroy(() => {
		if (unsubscribe) unsubscribe()
		// if ((window as any).Backdrop === backdropService) {
		// 	delete (window as any).Backdrop
		// }
	})
</script>

{#if visible}
	<div class="fixed inset-0 bg-dark/25 transition-opacity duration-300" style="z-index: {zIndex};" class:opacity-0={!visible}></div>
{/if}
