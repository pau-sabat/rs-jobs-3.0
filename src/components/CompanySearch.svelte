<script>
	import { onMount } from 'svelte'
	import SearchSelect from './SearchSelect.svelte'

	let companies = []

	const fetchCompanies = async () => {
		try {
			const response = await fetch('/data/companies.json')
			const data = await response.json()
			companies = data.companies
		} catch (error) {
			console.error('Error fetching companies:', error)
			companies = []
		}
	}

	onMount(() => {
		fetchCompanies()
	})
</script>

<SearchSelect placeholder="Nombre de la empresa" options={companies} searchKey="name">
	<svelte:fragment let:option>
		<a href={option.href} class="flex items-center gap-3">
			<img src={option.logo} alt={option.name} class="w-8 h-8 rounded-full object-cover" />
			<h4 class="text-heading-mobile-4 md:text-heading-desktop-4 font-bold text-secondary">{option.name}</h4>
		</a>
	</svelte:fragment>
</SearchSelect>
