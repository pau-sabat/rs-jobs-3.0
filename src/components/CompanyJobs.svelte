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

	let content

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
				jobs = data.jobs || []
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

	const onPageChange = () => {
		if (!content) return
		content.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}
</script>

<div class="flex flex-col gap-[25px]" bind:this={content}>
	<div class="bg-white lg:bg-transparent rounded-lg overflow-hidden">
		<Alert title="Activar alerta para esta empresa" compact />
	</div>
	{#if jobs.length > 0}
		<div class="flex flex-col gap-3 md:gap-5 lg:gap-10">
			<div class="flex flex-col gap-3">
				<span class="font-bold text-dark">{jobs.length} ofertas de empleo en {company}</span>
				<div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
					{#each currentPageJobs as job}
						<JobCard offer={job} compact />
					{/each}
				</div>
			</div>
			<Paginator {totalPages} {jobsPerPage} {currentPage} {onPageChange} text="Ver más ofertas" />
		</div>
	{/if}
</div>
