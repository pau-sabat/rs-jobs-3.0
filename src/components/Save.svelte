<script>
	export let isSaved = false
	export let text = 'Guardar'

	const toggleSave = () => {
		isSaved = !isSaved
	}
</script>

<button class="flex items-center justify-center w-8 h-8" aria-label={text} on:click|preventDefault={toggleSave}>
	<img src={isSaved ? '/assets/images/icons/heart-filled.svg' : '/assets/images/icons/heart-empty.svg'} alt="Corazón" class="w-5 h-[18.3px]" />
</button>
