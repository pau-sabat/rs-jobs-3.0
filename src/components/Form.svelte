<script>
	export let endpoint
	let errors = []
	let onSuccess = () => {}

	async function submit(e) {
		const result = await handleFormSubmit(e, endpoint)
		if (!result.success) {
			errors = result.errors
		} else {
			onSuccess()
		}
	}

	export async function handleFormSubmit(event, endpoint) {
		event.preventDefault()
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

<form on:submit={submit}>
	<slot {errors}></slot>
</form>
