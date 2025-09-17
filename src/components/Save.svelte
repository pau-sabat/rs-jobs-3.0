<script lang="ts">
	import Icon from './Icon.svelte'

	export let isSaved: boolean = false
	export let text: string = 'Guardar'

	const toggleSave = (): void => {
		isSaved = !isSaved
	}
</script>

<button class="flex items-center justify-center w-8 h-8" aria-label={text} on:click|preventDefault={toggleSave}>
	{#if isSaved}
		<Icon name="heart-filled" className="w-5 h-[18.3px] text-red" />
	{:else}
		<Icon name="heart-empty" className="w-5 h-[18.3px] text-red" />
	{/if}
</button>
