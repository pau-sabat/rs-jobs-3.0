var swiper = new Swiper('.testimonials-swiper', {
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
})
