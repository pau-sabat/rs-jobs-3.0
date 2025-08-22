<script>
	export let active = false
	export let text = ''
	export let big = false
</script>

<div class={`bg-white rounded-lg shadow-md flex flex-col gap-2 ${big ? 'p-6' : 'p-2.5'} h-fit`}>
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center justify-center h-6 w-6">
			<img src="/assets/images/alert-bell.svg" alt="Campana" class="w-5 h-5" />
		</div>

		<div class="relative inline-block w-9 h-5">
			<input bind:checked={active} id="switch-component" type="checkbox" class="peer appearance-none w-9 h-5 bg-gray/15 rounded-full cursor-pointer transition-colors duration-300" />
			<label for="switch-component" class="absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-secondary/50 rounded-full border border-gray/15 shadow-sm transition-all duration-300 peer-checked:translate-x-3 peer-checked:bg-blue cursor-pointer"> </label>
		</div>
	</div>
	<div class="flex flex-col">
		<h4 class="font-bold text-primary text-small-mobile md:text-small-desktop">Activar alerta</h4>
		<p class="text-legal-mobile md:text-legal-desktop text-dark">{text}</p>
	</div>
</div>
