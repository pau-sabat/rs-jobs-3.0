<script lang="ts">
	import Icon from './Icon.svelte'

	export let totalPages: number = 1
	export let currentPage: number = 1
	export let text: string = 'Ver más'
	export let onPageChange: (page: number) => void = () => {}

	function handlePageChange(page: number): void {
		if (page < 1) {
			page = 1
		} else if (page > totalPages) {
			page = totalPages
		}

		onPageChange(page)
	}
</script>

{#if totalPages > 1}
	<div class="md:hidden flex justify-center">
		<button on:click={() => handlePageChange(currentPage + 1)} class="btn btn-secondary-outline" disabled={currentPage >= totalPages}>
			{text}
		</button>
	</div>
	<div class="hidden md:flex flex-nowrap gap-2 items-center justify-center font-bold">
		<button on:click={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1} class="text-secondary flex items-center gap-2.5 py-1.5 px-3 rounded-[4px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-secondary/10">
			<span class="h-6 w-6 flex items-center justify-center">
				<Icon name="arrow-right" className="w-4 h-4 rotate-180" />
			</span>
			Anterior
		</button>
		{#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
			<button on:click={() => handlePageChange(page)} class="text-secondary flex items-center py-1.5 px-3 rounded-[4px] transition-colors {currentPage === page ? 'bg-secondary text-white' : 'hover:bg-secondary/10'}">
				{page}
			</button>
		{/each}
		<button on:click={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages} class="text-secondary flex items-center gap-2.5 px-3 rounded-[4px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-secondary/10">
			Siguiente
			<span class="h-6 w-6 flex items-center justify-center">
				<Icon name="arrow-right" className="w-4 h-4" />
			</span>
		</button>
	</div>
{/if}
