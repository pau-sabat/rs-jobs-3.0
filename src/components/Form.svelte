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

		// Verificar si hay archivos en el FormData
		const hasFiles = Array.from(formData.entries()).some(([key, value]) => value instanceof File)

		if (hasFiles) {
			// Si hay archivos, usar FormData directamente
			try {
				const res = await fetch(endpoint, {
					method: 'POST',
					body: formData,
				})

				const data = await res.json()
				if (!res.ok) throw data
				return { success: true, data }
			} catch (err) {
				return { success: false, errors: err }
			}
		} else {
			// Si no hay archivos, convertir a JSON
			const json = Object.fromEntries(formData)
			console.log(json)

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
	}
</script>

<form on:submit={submit} novalidate autocomplete="off">
	<slot {errors}></slot>
</form>
