import Swiper from 'swiper'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

const componentMap: Record<string, any> = {
	'.testimonials-swiper': {
		modules: [Autoplay, Pagination],
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
}

export const initSwiper = (): void => {
	Object.entries(componentMap).forEach(([selector, config]) => {
		const element = document.querySelector(selector) as HTMLElement
		if (element) {
			new Swiper(element, config)
		}
	})
}
