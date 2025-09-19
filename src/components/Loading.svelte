<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { loadingService } from '../services/loadingService';

	// Reactive loading state
	export let loading: boolean = false;
	let unsubscribe: (() => void) | null = null;

	// Subscribe to service changes
	onMount(() => {
		// Get initial state
		loading = loadingService.isLoading();

		// Subscribe to changes
		unsubscribe = loadingService.subscribe((isLoading) => {
			loading = isLoading;
		});

		// Expose service globally for easy access (from JS files)
		(window as any).Loading = loadingService;
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}

		// Clean up global references
		if ((window as any).Loading === loadingService) {
			delete (window as any).Loading;
		}
	});
</script>

{#if loading}
	<div class="fixed inset-0 flex items-center justify-center h-screen w-screen bg-light z-[9999]">
		<div class="animate-spin h-[60px] w-[60px] rounded-[50%] border-8 border-t-transparent border-primary"></div>
	</div>
{/if}
