<script>
	// Props
	export let accept = '.pdf,.doc,.docx,.png,.jpg,.jpeg'
	export let maxSize = 5 * 1024 * 1024 // 5MB en bytes
	export let maxFiles = 2

	// Mapeo de extensiones a MIME types
	const fileTypeMap = {
		'.pdf': 'application/pdf',
		'.doc': 'application/msword',
		'.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
		'.png': 'image/png',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg'
	}

	// Obtener tipos permitidos basados en la prop accept
	$: allowedExtensions = accept.split(',').map(ext => ext.trim())
	$: allowedMimeTypes = allowedExtensions
		.map(ext => fileTypeMap[ext])
		.filter(Boolean)

	// Variables internas
	let fileInput
	let isDragOver = false
	let errorMessage = ''
	let selectedFiles = []

	// Eventos
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	// Funciones para el dropzone
	const validateFileCount = (files) => {
		if (files.length > maxFiles) {
			errorMessage = `Solo puedes subir un máximo de ${maxFiles} archivo${maxFiles > 1 ? 's' : ''}.`
			return false
		}
		return true
	}

	const handleDragOver = event => {
		event.preventDefault()
		isDragOver = true
	}

	const handleDragLeave = event => {
		event.preventDefault()
		isDragOver = false
	}

	const handleDrop = event => {
		event.preventDefault()
		isDragOver = false

		const files = event.dataTransfer.files
		if (files.length > 0 && validateFileCount(files)) {
			processFiles(files)
		}
	}

	const handleClick = () => {
		fileInput.click()
	}

	const handleKeyDown = event => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			handleClick()
		}
	}

	const handleFileSelect = event => {
		const files = event.target.files
		if (files.length > 0 && validateFileCount(files)) {
			processFiles(files)
		}
	}

	const processFiles = files => {
		// Limpiar mensaje de error anterior
		errorMessage = ''

		// Si es modo de un solo archivo, limpiar archivos anteriores
		if (maxFiles === 1) {
			selectedFiles = []
		}

		for (const file of files) {
			// Validar tipo de archivo
			if (!allowedMimeTypes.includes(file.type)) {
				errorMessage = `Por favor, selecciona un archivo ${allowedExtensions.join(', ')} válido.`
				return
			}

			// Validar tamaño
			if (file.size > maxSize) {
				errorMessage = `El archivo es demasiado grande. El tamaño máximo permitido es ${(maxSize / 1024 / 1024).toFixed(0)}MB.`
				return
			}

			// Agregar archivo a la lista
			selectedFiles = [...selectedFiles, file]
		}

		// Emitir evento con todos los archivos
		dispatch('filesSelected', { files: selectedFiles })
	}

	const removeFile = (index = null) => {
		if (index !== null) {
			// Remover archivo específico por índice
			selectedFiles = selectedFiles.filter((_, i) => i !== index)
		} else {
			// Remover todos los archivos
			selectedFiles = []
		}
		fileInput.value = ''
		errorMessage = ''

		// Emitir evento con archivos actualizados
		dispatch('filesSelected', { files: selectedFiles })
	}
</script>

<div class="w-full">
	<div class="lg:border-2 border-gray lg:border-dashed rounded-lg p-6 text-center transition-all duration-200 cursor-pointer {errorMessage ? 'border-red bg-red/10' : selectedFiles.length > 0 ? 'border-green bg-green/10' : isDragOver ? '!border-blue bg-blue/10' : ' hover:border-blue hover:bg-blue/10'}" role="button" aria-label="Área para arrastrar y soltar archivos" on:dragover={handleDragOver} on:dragleave={handleDragLeave} on:drop={handleDrop} on:click={handleClick} on:keydown={handleKeyDown} tabindex="0">
		<div class="flex flex-col items-center gap-6">
			<div class="flex items-center justify-center w-12 h-12 md:w-12 md:h-12">
				<img src="/assets/images/icons/upload.svg" alt="Subir archivo" />
			</div>
			<div class="flex flex-col gap-2">
				<h3 class="text-small-mobile md:text-small-desktop font-bold">Seleccione un archivo<span class="hidden lg:inline">&nbsp;o arrastre y suelte aquí.</span></h3>
				<p class="text-caption-mobile md:text-caption-desktop text-gray">
					Formato {allowedExtensions.join(', ')} y máximo {maxSize / 1024 / 1024}MB
					{#if maxFiles > 1}
						<br />Máximo {maxFiles} archivos
					{/if}
				</p>
			</div>

            <!-- Botón para seleccionar archivo -->
            <button type="button" class="btn btn-tertiary-outline cursor-pointer" on:click|stopPropagation={handleClick}>
                Seleccionar archivo
            </button>
        </div>
	</div>

	<!-- Input file oculto -->
	<input type="file" bind:this={fileInput} {accept} multiple={maxFiles > 1} on:change={handleFileSelect} class="hidden" />

	<!-- Mensaje de error -->
	{#if errorMessage}
		<div class="mt-4 p-3 bg-red/5 border border-red/20 rounded-lg">
			<div class="flex items-center gap-2">
				<svg class="w-5 h-5 text-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
					<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
				</svg>
				<span class="text-sm text-red">{errorMessage}</span>
			</div>
		</div>
	{/if}

	<!-- Archivos seleccionados -->
	{#if selectedFiles.length > 0}
		<div class="mt-4 space-y-2">
			{#each selectedFiles as file, index}
				<div class="p-4 bg-gray/5 border border-gray/20 rounded-lg flex items-center justify-between">
					<div class="flex items-center gap-3">
						<div class="text-gray/60 flex-shrink-0">
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
								<path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</div>
						<div class="flex flex-col">
							<span class="text-sm font-medium text-gray-900 truncate max-w-[200px] md:max-w-[300px]">{file.name}</span>
							<span class="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
						</div>
					</div>
					<button type="button" class="p-1 text-gray/60 hover:text-red-500 transition-colors duration-200 flex-shrink-0" on:click={() => removeFile(index)} aria-label="Eliminar archivo">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
