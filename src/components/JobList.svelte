<script lang="ts">
	import { loadingService } from '../services/loadingService'
	import Paginator from './Paginator.svelte'
	import JobCard from './JobCard.svelte'
	import SearchBar from './SearchBar.svelte'
	import Alert from './Alert.svelte'
	import JobFilters from './JobFilters.svelte'
	import { onMount } from 'svelte'
	import type { Offer } from '$lib/types'
	import Form from './Form.svelte'

	let jobs: Offer[] = []
	let filters: any = {}
	let showLocation: boolean = false

	let totalPages: number = 1
	let jobsPerPage: number = 8
	let currentPage: number = 1

	$: startIndex = (currentPage - 1) * jobsPerPage
	$: endIndex = startIndex + jobsPerPage
	$: currentPageJobs = jobs.slice(startIndex, endIndex)

	const featuredCompanies: { link: string; image: string; class: string }[] = [
		{ link: '/empresa/solvethex', image: '/assets/images/home/companies/solvethex-logo.png', class: 'bg-black' },
		{ link: '/empresa/lver', image: '/assets/images/home/companies/lver-logo.png', class: 'bg-[#00A5AC]' },
		{ link: '/empresa/electryconsulting', image: '/assets/images/home/companies/electryconsulting-logo.png', class: 'bg-white' },
		{ link: '/empresa/spotify', image: '/assets/images/home/companies/spotify-logo.png', class: 'bg-black' },
	]

	async function fetchFilters(): Promise<void> {
		try {
			const response = await fetch('/data/filters.json')
			const data = await response.json()
			filters = data
		} catch (error) {
			console.error('Error fetching filters:', error)
			filters = {}
		}
	}

	onMount(() => {
		const updateShowLocation = (): void => {
			showLocation = window.innerWidth >= 768
		}

		updateShowLocation()

		window.addEventListener('resize', updateShowLocation)

		loadingService.show()

		Promise.all([
			fetch('/data/jobs.json')
				.then(response => response.json())
				.then(data => {
					jobs = data.jobs || []
					totalPages = Math.ceil(jobs.length / jobsPerPage)
				})
				.catch(error => {
					console.error('Error fetching jobs:', error)
					jobs = []
					totalPages = 1
				}),
			fetchFilters(),
		]).finally(() => {
			setTimeout(() => {
				//TODO: remove mock delay
				loadingService.hide()
			}, 1000)
		})

		return () => {
			window.removeEventListener('resize', updateShowLocation)
		}
	})

	function handlePageChange(page: number): void {
		currentPage = page
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}
</script>

<div class="flex flex-col gap-6 md:gap-8">
	<Form endpoint="/search">
		<SearchBar location={showLocation} />
	</Form>
	<div class="flex flex-col gap-4 lg:flex-row lg:flex-nowrap items-center justify-between lg:justify-end text-small-mobile lg:text-small-desktop">
		<div class="w-full lg:w-auto lg:hidden flex items-center justify-between gap-4">
			{jobs.length} empleos
			<JobFilters {filters} />
		</div>
		<div class="flex items-center gap-4">
			Ordenar por:
			<select name="published-date" class="pr-[30px] border-none py-0 text-primary underline appearance-none bg-transparent">
				<option value="newest">Fecha de publicación</option>
			</select>
		</div>
	</div>
	<div class="grid lg:grid-cols-9 gap-[30px]">
		<div class="hidden lg:flex flex-col gap-6 w-full col-span-2">
			<div class="bg-white rounded-lg shadow-md overflow-hidden">
				<Alert text="Mantente informado sobre las ofertas relacionadas con esta busqueda" />
			</div>
			<div class="hidden lg:block">
				<JobFilters {filters} />
			</div>
		</div>
		<div class="flex flex-col gap-3 w-full col-span-7">
			{#each currentPageJobs as job, index (job.job.title + currentPage)}
				<JobCard offer={job} />
				{#if index % 4 === 3 && index < currentPageJobs.length - 1}
					<div class="flex flex-wrap items-center justify-center gap-6">
						{#each featuredCompanies as company}
							<a href={company.link} class={`${company.class} w-[calc(50%-12px)] max-w-[170px] max-h-[130px] aspect-[170/130] lg:max-w-[109px] lg:max-h-[109px] lg:aspect-square  flex items-center justify-center`}>
								<img src={company.image} alt="" class="w-[50%] h-[50%] object-cover" />
							</a>
						{/each}
					</div>
				{/if}
			{/each}
			<Paginator {totalPages} {currentPage} text="Ver más ofertas" onPageChange={handlePageChange} />
		</div>
	</div>
</div>
