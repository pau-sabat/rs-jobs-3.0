<script>
	import SearchBar from "./SearchBar.svelte"
    import Form from "./Form.svelte"

    function handleSuccess() {
        console.log('success')
    }
</script>

<Form endpoint="/search" onSuccess={handleSuccess}>
    <SearchBar />
</Form>
