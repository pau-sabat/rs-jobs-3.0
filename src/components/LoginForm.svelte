<script lang="ts">
	import Form from './Form.svelte'
	import Icon from './Icon.svelte'

	function handleSuccess(): void {
		console.log('success')
	}
</script>

<Form endpoint="/api/login" onSuccess={handleSuccess}>
	<div class="flex flex-col gap-4 md:gap-6 items-center">
		<div class="w-full flex flex-col gap-4">
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-2 w-full flex-grow">
					<div class="flex items-center justify-center w-6 h-6">
						<Icon name="mail" className="w-5 h-4 text-secondary" />
					</div>
					<label for="email" class="sr-only">Email</label>
					<input type="email" placeholder="Correo electrónico" name="email" class="flex-grow text-small-mobile md:text-small-desktop py-1.5" />
				</div>
				<div class="flex items-center gap-2 w-full flex-grow">
					<div class="flex items-center justify-center w-6 h-6">
						<Icon name="lock" className="w-4 h-[21px] text-secondary" />
					</div>
					<label for="password" class="sr-only">Contraseña</label>
					<input type="password" placeholder="Contraseña" name="password" class="flex-grow text-small-mobile md:text-small-desktop py-1.5" />
				</div>
				<a href="/" class="mx-auto w-fit text-blue underline text-small-mobile md:text-small-desktop">¿Olvidaste tu contraseña?</a>
			</div>
			<div class="flex items-center justify-center gap-2">
				<div class="flex items-center justify-center h-5 w-5">
					<input type="checkbox" name="remember" id="remember" class="h-[18px] w-[18px]" />
				</div>
				<span class="text-small-mobile md:text-small-desktop">Mantener mi sesión abierta</span>
			</div>
		</div>
		<button type="submit" class="btn btn-primary w-full md:w-fit">Iniciar sesión</button>
	</div>
</Form>
