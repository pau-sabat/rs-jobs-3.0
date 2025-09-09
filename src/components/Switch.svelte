<script>
    export let active = false
</script>

<div class="relative inline-block w-9 h-5">
	<input
        bind:checked={active}
        id="switch-component"
        type="checkbox"
        class="peer appearance-none w-9 h-5 bg-gray/15 rounded-full cursor-pointer transition-colors duration-300"
    />
	<label for="switch-component" class="absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 bg-secondary/50 rounded-full border border-gray/15 shadow-sm transition-all duration-300 peer-checked:translate-x-3 peer-checked:bg-blue cursor-pointer"> </label>
</div>
