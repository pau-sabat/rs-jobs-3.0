<script lang="ts">
	import Icon from './Icon.svelte'
	import Switch from './Switch.svelte'

	export let active: boolean = false
	export let title: string = 'Activar alerta'
	export let text: string = ''
	export let big: boolean = false
	export let compact: boolean = false

	const handleClick = (): void => {
		active = !active
	}
</script>

<button on:click={handleClick} class={`w-full flex flex-col text-left gap-2 ${big ? 'p-4' : 'p-2.5'} h-fit`}>
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-2">
			<div class="flex items-center justify-center h-6 w-6">
				<Icon name="alert-bell" className="w-5 h-5 text-primary" />
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
