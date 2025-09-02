<script>
	import Form from './Form.svelte'
	import FileDropzone from './FileDropzone.svelte'

	let steps = 3
	let currentStep = 1

	$: progress = (currentStep / steps) * 100

	const nextStep = () => {
		if (currentStep === 1) {
			console.log('register candidate (step 1)')
			// POST register candidate
		} else if (currentStep === 2) {
			console.log('register candidate info (step 2)')
			// POST register candidate
		}
		else if (currentStep === 3) {
			console.log('update (info + cv) (step 3)')
			// PUT update (info + cv)
		}
		if (currentStep < steps) {
			currentStep++
		}
	}

	const prevStep = () => {
		if (currentStep > 1) {
			currentStep--
		}
	}
</script>

<div class="flex flex-col gap-4 md:gap-6">
	<div class="flex flex-col items-end">
		<span class="text-caption-mobile md:text-caption-desktop">{currentStep}/{steps}</span>
		<div class="w-full h-[7px] bg-gray/10 rounded-full overflow-hidden relative">
			<div class=" h-full bg-blue absolute top-0 left-0" style={`width: ${progress}%`}></div>
		</div>
	</div>

	{#if currentStep === 1}
		<Form onSuccess={nextStep}>
			<div class="grid md:grid-cols-2 gap-3 md:gap-y-[18px] md:gap-x-[30px]">
				<input type="text" id="name" name="name" placeholder="Nombre*" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<input type="text" id="first_surname" name="first_surname" placeholder="Primer apellido*" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<input type="text" id="second_surname" name="second_surname" placeholder="Segundo apellido" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<input type="tel" id="phone" name="phone" placeholder="Teléfono*" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<input type="email" id="email" name="email" placeholder="Correo electrónico*" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<input type="email" id="email_confirmation" name="email_confirmation" placeholder="Confirmar correo electrónico*" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<input type="password" id="password" name="password" placeholder="Contraseña*" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirmar contraseña*" class="py-1.5 text-small-mobile md:text-small-desktop" />
			</div>
			<button type="submit" class="btn btn-primary md:col-span-2 w-full md:w-fit mt-4 md:mt-6 float-right">Regístrate</button>
		</Form>
	{/if}
	{#if currentStep === 2}
		<Form onSuccess={nextStep}>
			<div class="grid md:grid-cols-2 gap-3 md:gap-y-[18px] md:gap-x-[30px] items-stretch">
				<input type="date" id="birthdate" name="birthdate" placeholder="Fecha de nacimiento (dd/mm/yyyy)" class="py-1.5 text-small-mobile md:text-small-desktop" />
				<select name="gender" class="text-small-mobile md:text-small-desktop py-1.5 border-b border-secondary/50">
					<option value="">Género (opcional)</option>
					<option value="male">Masculino</option>
					<option value="female">Femenino</option>
					<option value="other">Otro</option>
				</select>

				<div class="flex items-center gap-1 md:col-span-2">
					<div class="flex items-center justify-center w-6 h-6">
						<input type="checkbox" id="older16" name="older16" value="older16" class="w-[18px] h-[18px]" />
					</div>
					<label for="older16">Soy mayor de 16 años</label>
				</div>

				<div class="flex gap-1 md:flex-col md:items-start text-caption-mobile md:text-caption-desktop">
					<span class="text-small-mobile md:text-small-desktop font-bold">¿Vives en España?*</span>
					<div class="flex flex-nowrap items-center gap-3">
						<div class="flex items-center gap-1">
							<div class="flex items-center justify-center w-6 h-6">
								<input type="radio" checked id="lives_in_spain_yes" name="lives_in_spain" value="yes" class="w-5 h-5" />
							</div>
							<label for="lives_in_spain_yes">Sí</label>
						</div>
						<div class="flex items-center gap-1">
							<div class="flex items-center justify-center w-6 h-6">
								<input type="radio" id="lives_in_spain_no" name="lives_in_spain" value="no" class="w-5 h-5" />
							</div>
							<label for="lives_in_spain_no">No</label>
						</div>
					</div>
				</div>

				<div class="flex md:flex-col items-center md:items-start gap-x-3 gap-y-1 text-caption-mobile md:text-caption-desktop">
					<span class="text-small-mobile md:text-small-desktop font-bold">¿Tienes permiso de trabajo UE?*</span>
					<div class="flex flex-nowrap items-center gap-3">
						<div class="flex items-center gap-1">
							<div class="flex items-center justify-center w-6 h-6">
								<input type="radio" checked id="UET_permision_yes" name="UET_permision" value="yes" class="w-5 h-5" />
							</div>
							<label for="UET_permision_yes">Sí</label>
						</div>
						<div class="flex items-center gap-1">
							<div class="flex items-center justify-center w-6 h-6">
								<input type="radio" id="UET_permision_no" name="UET_permision" value="no" class="w-5 h-5" />
							</div>
							<label for="UET_permision_no">No</label>
						</div>
					</div>
				</div>

				<select name="country" autocomplete="off" class="text-small-mobile md:text-small-desktop py-1.5 border-b border-secondary/50">
					<option value="">País*</option>
					<option value="spain">España</option>
					<option value="other">Otro</option>
				</select>

				<select name="province" class="text-small-mobile md:text-small-desktop py-1.5 border-b border-secondary/50">
					<option value="">Provincia*</option>
				</select>

				<select name="town" class="text-small-mobile md:text-small-desktop py-1.5 border-b border-secondary/50">
					<option value="">Población*</option>
				</select>

				<input type="text" id="postal_code" name="postal_code" placeholder="Código postal*" autocomplete="off" class="py-1.5 text-small-mobile md:text-small-desktop" />
			</div>
			<button type="submit" class="btn btn-primary md:col-span-2 w-full md:w-fit mt-4 md:mt-6 float-right">Siguiente</button>
		</Form>
	{/if}
	{#if currentStep === 3}
		<Form endpoint="/api/register" onSuccess={nextStep}>
			<div class="flex flex-col gap-4 lg:gap-6">
				<div class="space-y-[12px]">
					<label for="cv" class="text-small-mobile md:text-small-desktop font-bold">Currículum*</label>
					<!-- Dropzone para CV -->
					<FileDropzone accept=".pdf,.doc,.docx" name="cv" />
				</div>
				<button type="submit" class="btn btn-primary w-full md:w-fit self-end">Regístrate</button>
			</div>
		</Form>
	{/if}
</div>
