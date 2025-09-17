<script lang="ts">
	export let endpoint: string | undefined = undefined
	export let errors: any[] = []
	export let onSuccess: () => void = () => {}

	async function submit(event: Event): Promise<void> {
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

	export async function handleFormSubmit(event: Event, endpoint: string): Promise<{ success: boolean; data?: any; errors?: any }> {
		const formData = new FormData(event.target as HTMLFormElement)

		const hasFiles = Array.from(formData.entries()).some(([, value]) => value instanceof File)

		if (hasFiles) {
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
