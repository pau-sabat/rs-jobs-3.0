export default function initNavbar() {
	const mobileMenuButton = document.getElementById('mobile-menu-button')
	const mobileMenu = document.getElementById('mobile-menu')
	const backdrop = document.getElementById('backdrop')

	let isMenuOpen = false

	mobileMenuButton.addEventListener('click', function () {
		if (!isMenuOpen) {
			// Open menu
			openMenu()
		} else {
			// Close menu
			closeMenu()
		}
	})

	function openMenu() {
		mobileMenu.classList.remove('hidden')
		mobileMenuButton.setAttribute('aria-label', 'Close mobile menu')
		mobileMenuButton.querySelector('[data-open]').classList.add('hidden')
		mobileMenuButton.querySelector('[data-close]').classList.remove('hidden')
		backdrop.classList.remove('hidden')
		// Trigger animation after a small delay
		setTimeout(() => {
			mobileMenu.classList.remove('translate-x-full')
		}, 10)
		isMenuOpen = true
	}

	function closeMenu() {
		mobileMenu.classList.add('translate-x-full')
		mobileMenuButton.setAttribute('aria-label', 'Open mobile menu')
		mobileMenuButton.querySelector('[data-open]').classList.remove('hidden')
		mobileMenuButton.querySelector('[data-close]').classList.add('hidden')
		backdrop.classList.add('hidden')

		setTimeout(() => {
			mobileMenu.classList.add('hidden')
		}, 300)
		isMenuOpen = false
	}

	// Close mobile menu when clicking outside
	document.addEventListener('click', function (event) {
		if (isMenuOpen && !mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
			closeMenu()
		}
	})

	// Close on escape key
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && isMenuOpen) {
			closeMenu()
		}
	})

	// Close menu when screen is resized and is not mobile
	window.addEventListener('resize', function () {
		if (window.innerWidth > 1024 && isMenuOpen) {
			closeMenu()
		}
	})
}
