export default function initBackdrop() {
	const backdrop = document.getElementById('backdrop')

	if (!backdrop) return

	document.addEventListener('openBackdrop', function () {
		const isCurrentlyVisible = !backdrop.classList.contains('hidden')

		if (isCurrentlyVisible) return

		showBackdrop()
	})

	document.addEventListener('closeBackdrop', function () {
		const isCurrentlyVisible = !backdrop.classList.contains('hidden')

		if (!isCurrentlyVisible) return

		hideBackdrop()
	})

	document.addEventListener('z-index', function (event) {
		if (!isNaN(event.detail)) {
			backdrop.style.zIndex = event.detail
		}
	})

	function showBackdrop() {
		document.body.style.overflow = 'hidden'
		backdrop.classList.remove('hidden')
		setTimeout(() => {
			backdrop.classList.remove('opacity-0')
		}, 10)
	}

	function hideBackdrop() {
		document.body.style.overflow = 'auto'
		backdrop.classList.add('opacity-0')
		setTimeout(() => {
			backdrop.classList.add('hidden')
		}, 300)
	}
}
