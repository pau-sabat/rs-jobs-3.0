<script>
	import { onMount } from 'svelte'

	let isOpen = false
	let banner = null
	let config = {
		analytics: false,
		advertising: false,
	}

	let triggers = []

	function setCookie(name, value, days) {
		const expires = new Date(Date.now() + days * 864e5).toUTCString()
		document.cookie = `${name}=${value}; expires=${expires}; path=/`
	}

	function getCookie(name) {
		return document.cookie
			.split('; ')
			.find(row => row.startsWith(name + '='))
			?.split('=')[1]
	}

	const saveConfig = () => {
		setCookie('cookie-consent', JSON.stringify(config))
		initCookies()
		close()
	}

	const rejectCookies = () => {
		config.analytics = false
		config.advertising = false
		saveConfig()
	}

	const acceptCookies = () => {
		config.analytics = true
		config.advertising = true
		saveConfig()
	}

	const acceptOptions = () => {
		config.analytics = true
		config.advertising = true
        console.log(config)
		saveConfig()
	}

	const initCookies = () => {
		console.log('init cookies')
	}

	const close = () => {
		isOpen = false
		triggers.forEach(trigger => {
			trigger.setAttribute('aria-expanded', 'false')
		})
		document.dispatchEvent(new CustomEvent('closeBackdrop'))
	}

	const open = () => {
		isOpen = true
		triggers.forEach(trigger => {
			trigger.setAttribute('aria-expanded', 'true')
		})
		document.dispatchEvent(new CustomEvent('openBackdrop'))
	}

	onMount(() => {
		const savedConfig = getCookie('cookie-consent')
		if (savedConfig) {
			try {
				config = JSON.parse(savedConfig)
			} catch {
				config = {
					analytics: false,
					advertising: false,
				}
			}
			initCookies()
		} else {
			open()
		}

		triggers = document.querySelectorAll('[aria-haspopup="dialog"]')
		triggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				open()
			})
		})

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                close()
            }
        })

        document.addEventListener('click', (event) => {
            const isClickInsideBanner = banner && banner.contains(event.target)
            const isClickInsideTriggers = Array.from(triggers).some(trigger => trigger.contains(event.target))

            if (isOpen && !isClickInsideBanner && !isClickInsideTriggers) {
                close()
            }
        })
	})
</script>

{#if isOpen}
	<div class="fixed w-full top-0 left-0 h-screen z-[100] overflow-y-auto">
		<div class="container py-5">
			<div bind:this={banner} class="bg-white shadow-md rounded-lg p-6 flex flex-col gap-6" id="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
				<h2 id="cookie-title" class="font-bold text-heading-mobile-2 md:text-heading-desktop-2 text-secondary uppercase text-center">PANEL DE CONFIGURACIÓN</h2>
				<p id="cookie-description">R&S utiliza cookies propias y de terceros, para garantizar el correcto funcionamiento de este Sitio Web, así como cookies de personalización, analíticas, publicitarias y de elaboración de perfiles basados en hábitos de navegación del usuario (por ejemplo, páginas visitadas). Para aceptar todas las cookies, haz clic en "ACEPTAR TODO". Haz clic en "OPCIONES" para aceptar únicamente las cookies marcadas en las casillas de configuración disponibles en este banner o pulsa en "RECHAZAR TODO" para rechazar las cookies no necesarias. Información adicional en nuestra <a href="/politica-de-cookies" class="text-primary">Política de Cookies</a>.</p>
				<div class="grid gap-2.5 md:grid-cols-3">
					<button class="btn btn-primary" on:click={acceptCookies}>Aceptar todo</button>
					<button class="btn btn-primary" on:click={acceptOptions}>Opciones</button>
					<button class="btn btn-primary" on:click={rejectCookies}>Rechazar todo</button>
				</div>

				<div class="flex flex-col gap-2 md:flex-row md:justify-center">
					<div class="flex items-center gap-2">
						<div class="flex items-center justify-center w-6 h-6">
							<input type="checkbox" id="analytics" class="w-[18px] h-[18px]" bind:checked={config.analytics} />
						</div>
						<label for="analytics" class="text-small-mobile md:text-small-desktop">Análisis o medición</label>
					</div>
					<div class="flex items-center gap-2">
						<div class="flex items-center justify-center w-6 h-6">
							<input type="checkbox" id="advertising" class="w-[18px] h-[18px]" bind:checked={config.advertising} />
						</div>
						<label for="advertising" class="text-small-mobile md:text-small-desktop">Publicidad comportamental</label>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
