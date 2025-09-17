<script lang="ts">
	import SearchBar from "./SearchBar.svelte"
    import Form from "./Form.svelte"

    function handleSuccess(): void {
        console.log('success')
    }
</script>

<Form endpoint="/search" onSuccess={handleSuccess}>
    <SearchBar />
</Form>
