import { backdropService } from "../services/backdropService";

export default function initNavbar(): void {
	const mobileMenuButton = document.getElementById('mobile-menu-button') as HTMLButtonElement;
	const mobileMenu = document.getElementById('mobile-menu') as HTMLElement;

	let isMenuOpen = false;

	mobileMenuButton.addEventListener('click', function () {
		if (!isMenuOpen) {
			openMenu();
		} else {
			closeMenu();
		}
	});

	function openMenu(): void {
		mobileMenu.classList.remove('hidden');
		mobileMenuButton.setAttribute('aria-label', 'Close mobile menu');
		mobileMenuButton.querySelector('[data-open]')?.classList.add('hidden');
		mobileMenuButton.querySelector('[data-close]')?.classList.remove('hidden');
		backdropService.show(40);
		// Trigger animation after a small delay
		requestAnimationFrame(() => {
			mobileMenu.classList.remove('translate-x-full');
		});
		isMenuOpen = true;
	}

	function closeMenu(): void {
		mobileMenu.classList.add('translate-x-full');
		mobileMenuButton.setAttribute('aria-label', 'Open mobile menu');
		mobileMenuButton.querySelector('[data-open]')?.classList.remove('hidden');
		mobileMenuButton.querySelector('[data-close]')?.classList.add('hidden');
		backdropService.hide();

		setTimeout(() => {
			mobileMenu.classList.add('hidden');
		}, 300);
		isMenuOpen = false;
	}

	// Close mobile menu when clicking outside
	document.addEventListener('click', function (event: MouseEvent) {
		if (isMenuOpen && !mobileMenuButton.contains(event.target as Node) && !mobileMenu.contains(event.target as Node)) {
			closeMenu();
		}
	});

	// Close on escape key
	document.addEventListener('keydown', function (event: KeyboardEvent) {
		if (event.key === 'Escape' && isMenuOpen) {
			closeMenu();
		}
	});

	// Close menu when screen is resized and is not mobile
	window.addEventListener('resize', function () {
		if (window.innerWidth > 1024 && isMenuOpen) {
			closeMenu();
		}
	});
}
