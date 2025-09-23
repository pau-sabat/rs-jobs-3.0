<script lang="ts">
	import { onMount } from 'svelte'
	import Alert from './Alert.svelte'
	import JobCard from './JobCard.svelte'
	import Paginator from './Paginator.svelte'
	import type { Offer } from '$lib/types'
	import { loadingService } from '../services/loadingService'

	export let company: string

	let jobs: Offer[] = []

	let totalPages: number = 1
	let jobsPerPage: number = 6
	let currentPage: number = 1

	$: startIndex = (currentPage - 1) * jobsPerPage
	$: endIndex = startIndex + jobsPerPage
	$: currentPageJobs = jobs.slice(startIndex, endIndex)

	onMount(async () => {
		await fetchJobs()
	})

	const fetchJobs = async (): Promise<void> => {
		loadingService.show()
		fetch('/data/jobs.json')
			.then(response => response.json())
			.then(data => {
				// Filtrar trabajos por empresa
				const allJobs = data.jobs || []
				jobs = allJobs.filter((job: any) => job.company && job.company.name && job.company.name.toLowerCase() === company.toLowerCase())
				totalPages = Math.ceil(jobs.length / jobsPerPage)
				updatePublishedJobsNumber()
			})
			.catch(error => {
				console.error('Error fetching jobs:', error)
				jobs = []
				totalPages = 1
			})
			.finally(() => {
				setTimeout(() => {
					//TODO: remove mock delay
					loadingService.hide()
				}, 1000)
			})
	}

	const updatePublishedJobsNumber = (): void => {
		const elements = document.getElementById('offers-number')
		if (elements) {
			elements.innerHTML = jobs.length.toString()
		}
	}

	const onPageChange = async (page: number): Promise<void> => {
		currentPage = page
	}
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-col gap-[25px] lg:flex-row-reverse lg:items-center lg:justify-between">
		<div class="bg-white lg:bg-transparent rounded-lg overflow-hidden">
			<Alert title="Activar alerta para esta empresa" compact />
		</div>
		<span class="font-bold text-dark">{jobs.length} ofertas de empleo en {company}</span>
	</div>
	{#if jobs.length > 0}
		<div class="flex flex-col gap-3 md:gap-5 lg:gap-10">
			<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
				{#each currentPageJobs as job (job.job.title + currentPage)}
					<JobCard offer={job} compact />
				{/each}
			</div>

			<Paginator {totalPages} {currentPage} {onPageChange} text="Ver más ofertas" />
		</div>
	{/if}
</div>
