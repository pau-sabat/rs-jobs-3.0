export default function jobOffer() {
	document.addEventListener('DOMContentLoaded', function () {
		const jobCtaMobile = document.getElementById('job-cta')
		const footer = document.getElementsByTagName('footer')[0]

		if (jobCtaMobile && footer) {
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						console.log(entry)
						if (entry.isIntersecting) {
							jobCtaMobile.style.display = 'none'
						} else {
							jobCtaMobile.style.display = 'block'
						}
					})
				},
				{
					threshold: 0,
					rootMargin: '0px 0px 0px 0px',
				}
			)

			observer.observe(footer)

			return () => {
				observer.disconnect()
			}
		}
	})
}
