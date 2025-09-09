<script>
	import Switch from './Switch.svelte'

	export let active = false
	export let title = 'Activar alerta'
	export let text = ''
	export let big = false
	export let compact = false

	const handleClick = () => {
		active = !active
	}
</script>

<button on:click={handleClick} class={`w-full flex flex-col text-left gap-2 ${big ? 'p-4' : 'p-2.5'} h-fit`}>
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-2">
			<div class="flex items-center justify-center h-6 w-6">
				<img src="/assets/images/icons/alert-bell.svg" alt="Campana" class="w-5 h-5" />
			</div>
			{#if compact}
				<h4 class="font-bold text-primary md:text-caption-desktop">{title}</h4>
			{/if}
		</div>

		<Switch bind:active />
	</div>
	{#if !compact}
		<div class="flex flex-col">
			<h4 class="font-bold text-primary text-small-mobile md:text-small-desktop">{title}</h4>
			<p class="text-legal-mobile md:text-legal-desktop text-dark">{text}</p>
		</div>
	{/if}
	{#if compact && text}
		<p class="text-caption-mobile md:text-caption-desktop text-dark">{text}</p>
	{/if}
</button>
