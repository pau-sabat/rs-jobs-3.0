<script>
	import Form from './Form.svelte'

	function handleSuccess() {
		console.log('success')
	}
</script>

<Form endpoint="/api/login" onSuccess={handleSuccess}>
	<div novalidate class="flex flex-col gap-4 md:gap-6 items-center">
		<div class="w-full flex flex-col gap-4">
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-2 w-full flex-grow">
					<div class="flex items-center justify-center w-6 h-6">
						<img src="/assets/images/icons/mail.svg" alt="Email" class="w-5 h-4" />
					</div>
					<input type="email" placeholder="Correo electrónico" name="mail" class="flex-grow text-small-mobile md:text-small-desktop py-1.5" />
				</div>
				<div class="flex items-center gap-2 w-full flex-grow">
					<div class="flex items-center justify-center w-6 h-6">
						<img src="/assets/images/icons/lock.svg" alt="Candado" class="w-4 h-[21px]" />
					</div>
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
