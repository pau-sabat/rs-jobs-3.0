<script lang="ts">
	import Form from './Form.svelte'

	function handleSuccess(): void {
		console.log('success')
	}
</script>

<Form endpoint="/api/contact" onSuccess={handleSuccess}>
	<div class="flex flex-col gap-4 md:gap-6 items-center">
		<div class="grid md:grid-cols-2 gap-4 w-full">
			<select name="source" id="source" class="md:col-span-2 flex-grow text-small-mobile md:text-small-desktop py-1.5 border-b border-secondary/50">
				<option value="" data-default>¿Cómo nos has conocido?</option>
			</select>
			<input type="text" id="name" name="name" placeholder="Nombre*" class="py-1.5 text-small-mobile md:text-small-desktop" />
			<input type="text" id="surnames" name="surnames" placeholder="Apellidos*" class="py-1.5 text-small-mobile md:text-small-desktop" />
			<select name="country" id="country" class="md:col-span-2 flex-grow text-small-mobile md:text-small-desktop py-1.5 border-b border-secondary/50">
				<option value="" data-default>País*</option>
				<option value="spain">España</option>
				<option value="other">Otro</option>
			</select>
			<input type="text" id="phone" name="phone" placeholder="Número de teléfono*" class="py-1.5 text-small-mobile md:text-small-desktop" />
			<input type="email" id="email" name="email" placeholder="Correo electrónico*" class="py-1.5 text-small-mobile md:text-small-desktop" />
			<input type="text" id="message" name="message" placeholder="¿En que podemos ayudarte?...*" class="md:col-span-2 py-1.5 text-small-mobile md:text-small-desktop" />
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-fit">Enviar mensaje</button>
	</div>
</Form>
