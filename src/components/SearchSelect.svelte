<script lang="ts">
	import Icon from './Icon.svelte'

	export let options: any[] = []
	export let placeholder: string = 'Buscar'
	export let searchKey: string = 'name'

	let searchText: string = ''
	let showDropdown: boolean = false

	$: filteredOptions = options.filter(option => option?.[searchKey]?.toLowerCase().includes(searchText.toLowerCase()))

	$: if (filteredOptions.length > 0 && searchText) {
		showDropdown = true
	} else {
		showDropdown = false
	}

	function handleInputFocus(): void {
		if (searchText && filteredOptions.length > 0) {
			showDropdown = true
		}
	}

	function handleInputBlur(): void {
		setTimeout(() => {
			showDropdown = false
		}, 150)
	}
</script>

<div class="relative">
	<div class="flex items-center gap-2 w-full flex-grow">
		<div class="flex items-center justify-center w-6 h-6">
			<Icon name="search" className="w-4 h-4 text-secondary" />
		</div>
		<label for="search" class="sr-only">{placeholder}</label>
		<input type="text" {placeholder} bind:value={searchText} name="search" class="flex-grow text-small-mobile md:text-small-desktop py-1.5" on:focus={handleInputFocus} on:blur={handleInputBlur} />
	</div>

	{#if showDropdown && searchText && Array.isArray(filteredOptions) && filteredOptions.length > 0}
		<div class="absolute top-full mt-2 left-0 right-0 bg-white border border-dark/20 rounded-lg shadow-lg z-10 max-h-72 overflow-y-auto">
			{#each filteredOptions as option (option[searchKey])}
				<div class="px-3 py-2 hover:bg-primary/15 cursor-pointer">
					<slot {option} />
				</div>
			{/each}
		</div>
	{/if}
	{#if searchText && Array.isArray(filteredOptions) && filteredOptions.length === 0}
		<div class="absolute top-full mt-2 left-0 right-0 bg-white border border-dark/20 rounded-lg shadow-lg z-10 max-h-72 overflow-y-auto">
			<p class="px-3 py-4 text-small-mobile md:text-small-desktop text-dark/75 text-left">No se encontraron resultados</p>
		</div>
	{/if}
</div>
