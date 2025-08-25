<script>
	export let search = true
	export let location = true
	export let button = true
	export let onSearch = (searchText) => {}

	let searchText = ''

	const handleSearch = () => {
		onSearch(searchText)
	}
</script>

<form class="bg-white p-2.5 rounded-lg shadow-md flex flex-col md:flex-row gap-4" novalidate name="search-bar">
	{#if search}
		<div class="flex items-center gap-2 w-full flex-grow">
			<div class="flex items-center justify-center w-6 h-6">
				<img src="/assets/images/search-icon.svg" alt="Buscar" class="w-4 h-4" />
			</div>
            <input type="text" placeholder="Puesto de trabajo o palabra clave" bind:value={searchText} name="search" class="flex-grow text-small-mobile md:text-small-desktop py-1.5" />
		</div>
	{/if}

	{#if location}
		<div class="flex items-center gap-2 w-full flex-grow">
			<div class="flex items-center justify-center w-6 h-6">
				<img src="/assets/images/location-icon.svg" alt="Ubicación" class="w-3.5 h-5">
			</div>
            <select name="location-select" class="custom-select pr-[40px] flex-grow text-small-mobile md:text-small-desktop py-1.5">
                <option value="">Selecciona la provincia</option>
            </select>
        </div>
	{/if}

	{#if button}
		<button type="button" class="btn btn-primary focus:outline-none focus:ring-0" on:click={handleSearch}>Buscar</button>
	{/if}
</form>
