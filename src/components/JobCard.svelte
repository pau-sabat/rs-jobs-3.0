<script>
	import Icon from './Icon.svelte'
	import { onMount } from 'svelte'
	import Save from './Save.svelte'
	import dayjs from '../services/dayjs.mjs'

	export let offer
	export let compact = false

	let company = offer.company
	let job = offer.job

	let publishedAt
	let isRecent = false

	let isSaved = false

	onMount(() => {
		if (job.publishedAt) {
			publishedAt = dayjs(job.publishedAt)
			isRecent = publishedAt.isAfter(dayjs().subtract(24, 'hours'))
		}
	})
</script>

<a href={job.url} class="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4 md:flex md:items-start md:gap-4">
	<!-- Logo de la empresa (desktop) -->
	<img src={company.logo} alt={`${company.name} logo`} class={`w-[65px] h-[65px] hidden md:block ${compact ? '!hidden' : ''}`} />

	<div class="flex flex-col gap-2 md:gap-4 w-full">
		<!-- Header con nombre de empresa y botón de guardar -->
		<div class="flex items-start justify-between gap-4">
			<div class="flex flex-grow items-center gap-2">
				<!-- Logo de la empresa (mobile) -->
				<img src={company.logo} alt={`${company.name} logo`} class="w-[35px] h-[35px] md:hidden {compact ? '!block' : ''}" />
				<h3 class="text-primary text-caption-mobile md:text-caption-desktop">{company.name}</h3>

				<!-- Badge destacada -->
				{#if company.featured}
					<span class="text-blue bg-blue/10 px-2 py-[2px] rounded-lg text-legal-mobile md:text-legal-desktop"> Destacada </span>
				{/if}
			</div>

			<!-- Botón de guardar (mobile) -->
			<div class="md:hidden">
				<Save bind:isSaved text="Guardar oferta"/>
			</div>
		</div>

		<!-- Título del trabajo y condiciones -->
		<div class="flex flex-col gap-1.5">
			<h2 class="text-dark font-bold">{job.title}</h2>

			<div class="flex gap-1 flex-wrap items-center text-legal-mobile md:text-legal-desktop">
				{#each job.conditions as condition}
					<span class="text-gray">{condition} |</span>
				{/each}

				<span class={isRecent ? 'text-green' : 'text-gray'}>
					{publishedAt ? publishedAt.fromNow() : ''}
				</span>

				{#if isRecent}
					<span class="text-green bg-green/10 px-2 py-[2px] rounded-[3px]">Nueva</span>
				{/if}
			</div>
		</div>

		<!-- Descripción (solo desktop) -->
		{#if !compact}
			<p class="text-gray hidden md:line-clamp-2 md:text-caption-desktop">
				{job.description}
			</p>
		{/if}

		<!-- Información adicional: ubicación, salario, categoría -->
		<div class="flex flex-wrap gap-x-4 gap-y-1 items-center text-legal-mobile md:text-legal-desktop text-gray">
			<!-- Ubicación -->
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-4 h-4 md:w-[18px] md:h-[18px]">
					<Icon name="location" className="w-[9px] h-[13px] md:w-[10.5px] md:h-[15px]" />
				</div>
				<span>{job.location}</span>
			</div>

			<!-- Salario -->
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-4 h-4 md:w-[18px] md:h-[18px]">
					<Icon name="wallet" className="w-[13.3px] h-[10.7px] md:w-[15px] md:h-[12px]" />
				</div>
				<span>{job.salary}</span>
			</div>

			<!-- Categoría (solo desktop) -->
			<div class="items-center gap-1 hidden md:flex">
				<div class="flex items-center justify-center w-4 h-4 md:w-[18px] md:h-[18px]">
					<Icon name="briefcase" className="w-[15px] h-[14.25px]" />
				</div>
				<span>{job.category}</span>
			</div>
		</div>
	</div>

	<!-- Botón de guardar (desktop) -->
	{#if !compact}
		<div class="hidden md:block">
			<Save bind:isSaved text="Guardar oferta"/>
		</div>
	{/if}
</a>
