declare global {
	class Swiper {
		constructor(element: HTMLElement, config: any);
	}
}

interface SwiperConfig {
	slidesPerView: number;
	spaceBetween: number;
	loop: boolean;
	autoplay: {
		delay: number;
		disableOnInteraction: boolean;
	};
	grabCursor: boolean;
	watchOverflow: boolean;
	observer: boolean;
	observeParents: boolean;
	pagination: {
		el: string;
		clickable: boolean;
	};
}

const componentMap: Record<string, SwiperConfig> = {
	'.testimonials-swiper': {
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false,
		},
		grabCursor: true,
		watchOverflow: true,
		observer: true,
		observeParents: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	},
};

export const initSwiper = (): void => {
	Object.entries(componentMap).forEach(([selector, config]) => {
		const element = document.querySelector(selector) as HTMLElement;
		if (element) {
			new Swiper(element, config);
		}
	});
};
