<script lang="ts">
	import { backdropService } from '../services/backdropService'
	import Icon from './Icon.svelte'
	import { onMount, onDestroy } from 'svelte'

	export let filters: any = {}

	let isOpen: boolean = false
	let filtersButton: HTMLElement | undefined

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

	onMount(() => {
		window.addEventListener('resize', handleResize, { passive: true })
		document.addEventListener('keydown', handleKeydown)
		document.addEventListener('click', handleClick)
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
	<form novalidate on:submit|preventDefault class="flex flex-col gap-6 px-4 py-6 lg:p-0">
		<button on:click={closeFilters} type="button" class="btn btn-secondary text-caption-mobile lg:hidden">Ver ofertas</button>

		<div class="space-y-[8px]">
			<label for="keyword" class="text-small-mobile md:text-small-desktop font-bold">Palabra clave</label>
			<div class="flex items-stretch gap-1.5">
				<input type="text" id="keyword" name="keyword" placeholder="Palabra clave" class="flex-1 min-w-0 py-1 text-caption-mobile md:text-caption-desktop" />
				<button type="button" class="btn btn-primary text-caption-mobile md:text-caption-desktop flex-shrink-0">OK</button>
			</div>
		</div>

		<fieldset class="space-y-[8px] text-caption-mobile md:text-caption-desktop">
			<legend class="text-small-mobile md:text-small-desktop font-bold">Fecha</legend>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" checked id="any-date" name="date" value="any-date" class="w-5 h-5" />
				</div>
				<label for="any-date">Cualquier fecha</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" id="last-24-hours" name="date" value="last-24-hours" class="w-5 h-5" />
				</div>
				<label for="last-24-hours">Últimas <span class="text-green">24 horas</span></label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" id="last-7-days" name="date" value="last-7-days" class="w-5 h-5" />
				</div>
				<label for="last-7-days">Últimos 7 días</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="radio" id="last-15-days" name="date" value="last-15-days" class="w-5 h-5" />
				</div>
				<label for="last-15-days">Últimos 15 días</label>
			</div>
		</fieldset>

		<div class="flex flex-col gap-2">
			<label for="location-select" class="text-small-mobile md:text-small-desktop font-bold">Provincias</label>
			<select name="location-select" id="location-select" class=" flex-grow text-caption-mobile md:text-caption-desktop py-1 border-b border-secondary/50">
				<option value="">Selecciona la provincia</option>
			</select>
		</div>

		<div class="flex flex-col gap-2">
			<label for="category" class="text-small-mobile md:text-small-desktop font-bold">Categoría</label>
			<select name="category" id="category" class=" flex-grow text-caption-mobile md:text-caption-desktop py-1 border-b border-secondary/50">
				<option value="">Selecciona la categoría</option>
			</select>
		</div>

		{#if filters.modality}
			<fieldset class="space-y-[8px] text-caption-mobile md:text-caption-desktop">
				<legend class="text-small-mobile md:text-small-desktop font-bold">Modalidad</legend>
				{#each filters.modality as filter}
					<div class="flex items-center gap-1">
						<div class="flex items-center justify-center w-6 h-6">
							<input type="checkbox" id={filter.id} name="modality" value={filter.id} class="w-[18px] h-[18px]" />
						</div>
						<label for={filter.id}>{filter.label} ({filter.count})</label>
					</div>
				{/each}
			</fieldset>
		{/if}

		<div class="flex flex-col gap-2">
			<label for="workday-type" class="text-small-mobile md:text-small-desktop font-bold">Tipo de jornada</label>
			<select name="workday-type" id="workday-type" class=" flex-grow text-caption-mobile md:text-caption-desktop py-1 border-b border-secondary/50">
				<option value="">Selecciona el tipo de jornada</option>
			</select>
		</div>

		<fieldset class="space-y-[8px] text-caption-mobile md:text-caption-desktop">
			<legend class="text-small-mobile md:text-small-desktop font-bold">Tipo de contrato</legend>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="freelance" name="contract-type" value="freelance" class="w-[18px] h-[18px]" />
				</div>
				<label for="freelance">Freelance</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="fixed-duration" name="contract-type" value="fixed-duration" class="w-[18px] h-[18px]" />
				</div>
				<label for="fixed-duration">Duración determinada</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="substitution" name="contract-type" value="substitution" class="w-[18px] h-[18px]" />
				</div>
				<label for="substitution">Sustitución</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="internship" name="contract-type" value="internship" class="w-[18px] h-[18px]" />
				</div>
				<label for="internship">Prácticas</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="indefinite" name="contract-type" value="indefinite" class="w-[18px] h-[18px]" />
				</div>
				<label for="indefinite">Indefinido</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="part-time" name="contract-type" value="part-time" class="w-[18px] h-[18px]" />
				</div>
				<label for="part-time">Tiempo parcial</label>
			</div>
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-6 h-6">
					<input type="checkbox" id="others" name="contract-type" value="others" class="w-[18px] h-[18px]" />
				</div>
				<label for="others">Otros</label>
			</div>
		</fieldset>
	</form>
</div>
