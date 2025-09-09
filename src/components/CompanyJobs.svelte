<script>
	import { onMount } from 'svelte'
	import Alert from './Alert.svelte'
	import JobCard from './JobCard.svelte'
	import Paginator from './Paginator.svelte'

	export let company

	let jobs = []

	let totalPages = 1
	let jobsPerPage = 6
	let currentPage = 1

	$: startIndex = (currentPage - 1) * jobsPerPage
	$: endIndex = startIndex + jobsPerPage
	$: currentPageJobs = jobs.slice(startIndex, endIndex)

	onMount(async () => {
		await fetchJobs()
	})

	const fetchJobs = async () => {
		fetch('/data/jobs.json')
			.then(response => response.json())
			.then(data => {
				// Filtrar trabajos por empresa
				const allJobs = data.jobs || []
				jobs = allJobs.filter(job => job.company && job.company.name && job.company.name.toLowerCase() === company.toLowerCase())
				totalPages = Math.ceil(jobs.length / jobsPerPage)
				updatePublishedJobsNumber()
			})
			.catch(error => {
				console.error('Error fetching jobs:', error)
				jobs = []
				totalPages = 1
			})
	}

	const updatePublishedJobsNumber = () => {
		const elements = document.getElementById('offers-number')
		if (elements) {
			elements.innerHTML = jobs.length
		}
	}

	const onPageChange = async page => {
		currentPage = page
	}
</script>

<div class="flex flex-col gap-[25px]">
	<div class="bg-white lg:bg-transparent rounded-lg overflow-hidden">
		<Alert title="Activar alerta para esta empresa" compact />
	</div>
	{#if jobs.length > 0}
		<div class="flex flex-col gap-3 md:gap-5 lg:gap-10">
			<div class="flex flex-col gap-3">
				<span class="font-bold text-dark">{jobs.length} ofertas de empleo en {company}</span>
				<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
					{#each currentPageJobs as job (job.job.title + currentPage)}
						<JobCard offer={job} compact />
					{/each}
				</div>
			</div>
			<Paginator {totalPages} {jobsPerPage} {currentPage} {onPageChange} text="Ver más ofertas" />
		</div>
	{/if}
</div>
