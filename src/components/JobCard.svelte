<script>
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
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 15" fill="none" class="w-[9px] h-[13px] md:w-[10.5px] md:h-[15px]">
						<path d="M5.25 0C2.3475 0 0 2.3475 0 5.25C0 9.1875 5.25 15 5.25 15C5.25 15 10.5 9.1875 10.5 5.25C10.5 2.3475 8.1525 0 5.25 0ZM1.5 5.25C1.5 3.18 3.18 1.5 5.25 1.5C7.32 1.5 9 3.18 9 5.25C9 7.41 6.84 10.6425 5.25 12.66C3.69 10.6575 1.5 7.3875 1.5 5.25Z" fill="#6C757D" />
						<path d="M5.25 7.125C6.28553 7.125 7.125 6.28553 7.125 5.25C7.125 4.21447 6.28553 3.375 5.25 3.375C4.21447 3.375 3.375 4.21447 3.375 5.25C3.375 6.28553 4.21447 7.125 5.25 7.125Z" fill="#6C757D" />
					</svg>
				</div>
				<span>{job.location}</span>
			</div>

			<!-- Salario -->
			<div class="flex items-center gap-1">
				<div class="flex items-center justify-center w-4 h-4 md:w-[18px] md:h-[18px]">
					<img src="/assets/images/icons/wallet.svg" alt="Salario" class="w-[13.3px] h-[10.7px] md:w-[15px] md:h-[12px]" />
				</div>
				<span>{job.salary}</span>
			</div>

			<!-- Categoría (solo desktop) -->
			<div class="items-center gap-1 hidden md:flex">
				<div class="flex items-center justify-center w-4 h-4 md:w-[18px] md:h-[18px]">
					<img src="/assets/images/icons/briefcase.svg" alt="Categoría" class="w-auto h-auto" />
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
