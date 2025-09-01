<script>
	export let endpoint
	export let errors = []
	export let onSuccess = () => {}

	async function submit(event) {
		event.preventDefault()
		if (endpoint) {
			const result = await handleFormSubmit(event, endpoint)
			if (!result.success) {
				errors = result.errors
			} else {
				onSuccess()
			}
		} else {
			onSuccess()
		}
	}

	export async function handleFormSubmit(event, endpoint) {
		const formData = new FormData(event.target)
		const json = Object.fromEntries(formData)

		try {
			const res = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(json),
			})

			const data = await res.json()
			if (!res.ok) throw data
			return { success: true, data }
		} catch (err) {
			return { success: false, errors: err }
		}
	}
</script>

<form on:submit={submit} novalidate autocomplete="off">
	<slot {errors}></slot>
</form>
