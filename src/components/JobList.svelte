<script>
	import Paginator from './Paginator.svelte'
	import JobCard from './JobCard.svelte'
	import SearchBar from './SearchBar.svelte'
	import JobAlert from './JobAlert.svelte'
	import JobFilters from './JobFilters.svelte'
	import { onMount } from 'svelte'

	let jobs = []
	let totalPages = 1
	let jobsPerPage = 8
	let currentPage = 1
	let showLocation = false

	$: startIndex = (currentPage - 1) * jobsPerPage
	$: endIndex = startIndex + jobsPerPage
	$: currentPageJobs = jobs.slice(startIndex, endIndex)

	onMount(() => {
		const updateShowLocation = () => {
			showLocation = window.innerWidth >= 768
		}

		updateShowLocation()

		window.addEventListener('resize', updateShowLocation)

		return () => {
			window.removeEventListener('resize', updateShowLocation)
		}
	})

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
		})

	function handlePageChange(page) {
		currentPage = page
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	function handleSearch(searchText) {
		console.log(searchText)
	}
</script>

<div class="flex flex-col gap-6 md:gap-8">
	<SearchBar location={showLocation} onSearch={handleSearch} />
	<div class="flex flex-col gap-4 lg:flex-row lg:flex-nowrap items-center justify-between text-small-mobile lg:text-small-desktop">
		<div class="w-full lg:w-auto flex items-center justify-between gap-4">
			{jobs.length} empleos
			<div class="lg:hidden">
				<JobFilters />
			</div>
		</div>
		<div class="flex items-center gap-4">
			Ordenar por
			<select name="published-date" class="custom-select pr-[30px] text-primary underline appearance-none bg-transparent">
				<option value="newest">Fecha de publicación</option>
			</select>
		</div>
	</div>
	<div class="grid lg:grid-cols-9 gap-[30px]">
		<div class="hidden lg:flex flex-col gap-6 w-full col-span-2">
			<JobAlert text="Mantente informado sobre las ofertas relacionadas con esta busqueda" />
			<div class="hidden lg:block">
				<JobFilters />
			</div>
		</div>
		<div class="flex flex-col gap-3 w-full col-span-7">
			{#each currentPageJobs as job, index}
				<JobCard jobOffer={job} />
				{#if index % 4 === 3 && index < currentPageJobs.length - 1}
					<div class="flex flex-wrap items-center justify-center gap-6">
						{#each [1, 2, 3, 4] as i}
							<a href="/" class="bg-dark/50 w-[calc(50%-12px)] max-w-[170px] max-h-[130px] aspect-[170/130] flex items-center justify-center">
								Company Logo
							</a>
						{/each}
					</div>
				{/if}
			{/each}
			<Paginator {totalPages} {currentPage} text="Ver más ofertas" onPageChange={handlePageChange} />
		</div>
	</div>
</div>
