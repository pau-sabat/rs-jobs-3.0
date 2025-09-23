<script lang="ts">
	import { backdropService } from '../services/backdropService'
	import Icon from './Icon.svelte'
	import { onMount, onDestroy } from 'svelte'

	export let filters: any = {}

	let isOpen: boolean = false
	let filtersButton: HTMLElement | undefined
	let form: HTMLFormElement | undefined

	// Variables reactivas para los valores del formulario
	let keyword: string = ''
	let date: string = ''
	let locationSelect: string = ''
	let category: string = ''
	let workdayType: string = ''
	let modality: string[] = []
	let contractType: string[] = []

	$: formData = (() => {
		// Crear un objeto con todas las variables del formulario directamente
		const allFormValues = {
			keyword,
			date,
			'location-select': locationSelect,
			category,
			'workday-type': workdayType,
			modality,
			'contract-type': contractType,
		}

		// Filtrar solo los valores que tienen contenido
		const filteredData = Object.fromEntries(
			Object.entries(allFormValues).filter(([_, value]) => {
				if (Array.isArray(value)) {
					return value.length > 0
				}
				return value && value.toString().trim() !== ''
			}),
		)

		console.log(filteredData)
		return filteredData
	})()

	$: hasFormData = Object.keys(formData).length > 0

	function toggleFilters(): void {
		if (window.innerWidth >= 1024) return

		if (isOpen) {
			closeFilters()
		} else {
			openFilters()
		}
	}

	function openFilters(): void {
		isOpen = true
		backdropService.show()
	}

	function closeFilters(): void {
		isOpen = false
		backdropService.hide()
	}

	function handleResize(): void {
		if (window.innerWidth > 1024 && isOpen) {
			closeFilters()
		}
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && isOpen) {
			closeFilters()
		}
	}

	function handleClick(event: MouseEvent): void {
		if (window.innerWidth >= 1024) return

		if (isOpen && filtersButton && !filtersButton.contains(event.target as Node)) {
			closeFilters()
		}
	}

	function handleSubmit(event: Event): void {
		event.preventDefault()
		console.log(formData)
		if (!form) return
		if (Object.keys(formData).length === 0) return

		//ir a la ruta actual + query params
		const url = new URL(window.location.href)

		// Limpiar todos los parámetros de búsqueda existentes
		const searchParams = ['keyword', 'date', 'location-select', 'category', 'workday-type', 'modality', 'contract-type']
		searchParams.forEach(param => url.searchParams.delete(param))

		// Solo agregar parámetros si hay datos
		if (Object.keys(formData).length > 0) {
			Object.entries(formData).forEach(([key, value]) => {
				if (Array.isArray(value)) {
					// Para arrays, agregar cada valor por separado
					value.forEach(v => url.searchParams.append(key, v.toString()))
				} else {
					url.searchParams.set(key, value.toString())
				}
			})
		}

		window.history.pushState({}, '', url.toString())
		window.location.href = url.toString()
	}

	function initializeFormFromQueryParams(): void {
		const urlParams = new URLSearchParams(window.location.search)

		// Inicializar variables reactivas desde query params
		keyword = urlParams.get('keyword') || ''
		date = urlParams.get('date') || ''
		locationSelect = urlParams.get('location-select') || ''
		category = urlParams.get('category') || ''
		workdayType = urlParams.get('workday-type') || ''
		modality = urlParams.getAll('modality')
		contractType = urlParams.getAll('contract-type')
	}

	onMount(() => {
		window.addEventListener('resize', handleResize, { passive: true })
		document.addEventListener('keydown', handleKeydown)
		document.addEventListener('click', handleClick)

		// Inicializar formulario con query parameters
		requestAnimationFrame(initializeFormFromQueryParams)
	})

	onDestroy(() => {
		window.removeEventListener('resize', handleResize)
		document.removeEventListener('keydown', handleKeydown)
		document.removeEventListener('click', handleClick)
		if (isOpen) {
			backdropService.hide()
		}
	})
</script>

<button type="button" bind:this={filtersButton} on:click={toggleFilters} class="flex items-center gap-2.5 px-3 py-1.5 border border-primary font-bold text-primary rounded-[4px] lg:hidden">
	<div class="flex items-center justify-center w-6 h-6">
		<Icon name="filters" className="w-[18px] h-3" />
	</div>
	Filtros
</button>

<div class={`fixed lg:static top-0 right-0 w-full sm:w-[70%] lg:w-full z-[70] lg:z-auto h-screen lg:h-auto max-w-[342px] lg:max-w-full bg-light transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-out overflow-y-auto`}>
	<form novalidate on:submit|preventDefault={handleSubmit} bind:this={form} class="flex flex-col gap-6 px-4 py-6 lg:p-0">
		<button on:click={closeFilters} type="button" class="btn btn-secondary text-caption-mobile lg:hidden">Ver ofertas</button>

		<div class="space-y-[8px]">
			<label for="keyword" class="text-small-mobile md:text-small-desktop font-bold">Palabra clave</label>
			<div class="flex items-stretch gap-1.5">
				<input type="text" id="keyword" name="keyword" bind:value={keyword} placeholder="Palabra clave" class="flex-1 min-w-0 py-1 text-caption-mobile md:text-caption-desktop" />
				<button type="submit" class="btn btn-primary text-caption-mobile md:text-caption-desktop flex-shrink-0">OK</button>
			</div>
		</div>

		<fieldset class="space-y-[8px] text-caption-mobile md:text-caption-desktop">
			<legend class="text-small-mobile md:text-small-desktop font-bold">Fecha</legend>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" bind:group={date} id="any-date" name="date" value="" class="w-5 h-5" />
				</div>
				<label for="any-date">Cualquier fecha</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" bind:group={date} id="last-24-hours" name="date" value="last-24-hours" class="w-5 h-5" />
				</div>
				<label for="last-24-hours">Últimas <span class="text-green">24 horas</span></label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" bind:group={date} id="last-7-days" name="date" value="last-7-days" class="w-5 h-5" />
				</div>
				<label for="last-7-days">Últimos 7 días</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" bind:group={date} id="last-15-days" name="date" value="last-15-days" class="w-5 h-5" />
				</div>
				<label for="last-15-days">Últimos 15 días</label>
			</div>
		</fieldset>

		<div class="flex flex-col gap-2">
			<label for="location-select" class="text-small-mobile md:text-small-desktop font-bold">Provincias</label>
			<select name="location-select" id="location-select" bind:value={locationSelect} class=" flex-grow text-caption-mobile md:text-caption-desktop py-1 border-b border-secondary/50">
				<option value="">Selecciona la provincia</option>
			</select>
		</div>

		<div class="flex flex-col gap-2">
			<label for="category-select" class="text-small-mobile md:text-small-desktop font-bold">Categoría</label>
			<select name="category" id="category-select" bind:value={category} class=" flex-grow text-caption-mobile md:text-caption-desktop py-1 border-b border-secondary/50">
				<option value="">Selecciona la categoría</option>
			</select>
		</div>

		{#if filters.modality}
			<fieldset class="space-y-[8px] text-caption-mobile md:text-caption-desktop">
				<legend class="text-small-mobile md:text-small-desktop font-bold">Modalidad</legend>
				{#each filters.modality as filter}
					<div class="flex items-center gap-1">
						<div class="flex items-center justify-center w-6 h-6">
							<input type="checkbox" id={filter.id} name="modality" value={filter.id} bind:group={modality} class="w-[18px] h-[18px]" />
						</div>
						<label for={filter.id}>{filter.label} ({filter.count})</label>
					</div>
				{/each}
			</fieldset>
		{/if}

		<div class="flex flex-col gap-2">
			<label for="workday-type" class="text-small-mobile md:text-small-desktop font-bold">Tipo de jornada</label>
			<select name="workday-type" id="workday-type" bind:value={workdayType} class=" flex-grow text-caption-mobile md:text-caption-desktop py-1 border-b border-secondary/50">
				<option value="">Selecciona el tipo de jornada</option>
				<option value="full-time">Jornada completa</option>
				<option value="part-time">Media jornada</option>
				<option value="flexible">Jornada flexible</option>
				<option value="reduced">Jornada reducida</option>
			</select>
		</div>

		<fieldset class="space-y-[8px] text-caption-mobile md:text-caption-desktop">
			<legend class="text-small-mobile md:text-small-desktop font-bold">Tipo de contrato</legend>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="freelance" name="contract-type" value="freelance" bind:group={contractType} class="w-[18px] h-[18px]" />
				</div>
				<label for="freelance">Freelance</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="fixed-duration" name="contract-type" value="fixed-duration" bind:group={contractType} class="w-[18px] h-[18px]" />
				</div>
				<label for="fixed-duration">Duración determinada</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="substitution" name="contract-type" value="substitution" bind:group={contractType} class="w-[18px] h-[18px]" />
				</div>
				<label for="substitution">Sustitución</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="internship" name="contract-type" value="internship" bind:group={contractType} class="w-[18px] h-[18px]" />
				</div>
				<label for="internship">Prácticas</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="indefinite" name="contract-type" value="indefinite" bind:group={contractType} class="w-[18px] h-[18px]" />
				</div>
				<label for="indefinite">Indefinido</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="part-time" name="contract-type" value="part-time" bind:group={contractType} class="w-[18px] h-[18px]" />
				</div>
				<label for="part-time">Tiempo parcial</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="others" name="contract-type" value="others" bind:group={contractType} class="w-[18px] h-[18px]" />
				</div>
				<label for="others">Otros</label>
			</div>
		</fieldset>
		{#if hasFormData}
			<button type="submit" class="btn btn-primary w-full">Buscar</button>
		{/if}
	</form>
</div>
