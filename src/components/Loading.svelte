<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { loadingService } from '../services/loadingService'

	// Reactive loading state
	let loading: boolean = false
	let unsubscribe: (() => void) | null = null

	// Function to prevent scroll
	function preventScroll() {
		document.body.style.overflow = 'hidden'
	}

	// Function to restore scroll
	function restoreScroll() {
		document.body.style.overflow = ''
	}

	// Subscribe to service changes
	onMount(() => {
		// Get initial state
		loading = loadingService.isLoading()

		// Subscribe to changes
		unsubscribe = loadingService.subscribe(isLoading => {
			loading = isLoading
			// Control scroll based on loading state
			if (isLoading) {
				preventScroll()
			} else {
				restoreScroll()
			}
		})

		// Handle initial state
		if (loading) {
			preventScroll()
		}

		// expose in window
		// ;(window as any).Loading = loadingService
	})

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe()
		}

		// Always restore scroll when component is destroyed
		restoreScroll()

		// Clean up global references
		// if ((window as any).Loading === loadingService) {
		// 	delete (window as any).Loading;
		// }
	})
</script>

{#if loading}
	<div class="fixed inset-0 flex items-center justify-center h-screen w-screen bg-light z-[9999]">
		<div class="animate-spin h-[60px] w-[60px] rounded-[50%] border-8 border-t-transparent border-primary"></div>
	</div>
{/if}
