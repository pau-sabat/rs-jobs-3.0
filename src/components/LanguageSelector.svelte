<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import Icon from './Icon.svelte'

	export let languages: string[] = ['es', 'ca']
	export let currentLanguage: string = languages[0]

	let showDropdown: boolean = false
	let dropdown: HTMLElement | undefined
	let button: HTMLElement | undefined

	function handleClickOutside(event: MouseEvent) {
		if (!showDropdown) return

		const target = event.target as Node
		const isClickInsideDropdown = dropdown?.contains(target)
		const isClickInsideButton = button?.contains(target)

		if (!isClickInsideDropdown && !isClickInsideButton) {
			showDropdown = false
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			showDropdown = false
		}
	}

	function handleResize() {
		if (showDropdown) {
			showDropdown = false
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside)
		document.addEventListener('keydown', handleKeydown)
		window.addEventListener('resize', handleResize)
	})

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside)
		document.removeEventListener('keydown', handleKeydown)
		window.removeEventListener('resize', handleResize)
	})
</script>

<div class="relative text-secondary">
	<button bind:this={button} class="flex items-center gap-1.5 p-2" on:click={() => (showDropdown = !showDropdown)} aria-expanded={showDropdown}>
		<span>{currentLanguage}</span>
		<Icon name="expand" className="w-2.5 h-[5px]" />
	</button>

	{#if showDropdown}
		<div bind:this={dropdown} class="absolute top-full lg:mt-2 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bg-white border border-dark/20 rounded-lg shadow-lg z-10 max-h-72 overflow-y-auto px-3 py-2">
			{#each languages as language}
				<div class="hover:bg-gradient-primary cursor-pointer px-2 py-1 rounded-sm flex items-center justify-between flex-nowrap gap-1.5" on:click={() => (currentLanguage = language)}>
					<span>{language}</span>
					{#if currentLanguage === language}
						<div class="w-4 h-4 flex items-center justify-center">
							<Icon name="check" className="w-3 h-3" />
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>
