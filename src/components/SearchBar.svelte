<script lang="ts">
	import Icon from './Icon.svelte'

	export let search: boolean = true
	export let location: boolean = true
	export let button: boolean = true
</script>

<div class="bg-white p-2.5 rounded-lg shadow-md flex flex-col md:flex-row gap-4">
	{#if search}
		<div class="flex items-center gap-2 w-full flex-grow">
			<div class="flex items-center justify-center w-6 h-6">
				<Icon name="search" className="w-4 h-4 text-secondary" />
			</div>
			<label for="search" class="sr-only">Buscar puesto de trabajo o palabra clave</label>
			<input type="text" placeholder="Puesto de trabajo o palabra clave" name="search" id="search" class="flex-grow text-small-mobile md:text-small-desktop py-1.5" />
		</div>
	{/if}

	{#if location}
		<div class="flex items-center gap-2 w-full flex-grow">
			<div class="flex items-center justify-center w-6 h-6">
				<Icon name="location" className="w-3.5 h-5 text-secondary" />
			</div>
			<label for="location-select" class="sr-only">Ubicación</label>
			<select name="location-select" id="location-select" class="flex-grow text-small-mobile md:text-small-desktop py-1.5 border-b border-secondary/50">
				<option value="" data-default>Selecciona la provincia</option>
			</select>
		</div>
	{/if}

	{#if button}
		<button type="submit" class="btn btn-primary focus:outline-none focus:ring-0">Buscar</button>
	{/if}
</div>
