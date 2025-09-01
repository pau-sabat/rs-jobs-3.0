export default function initLocationSelect() {
	const selects = document.querySelectorAll('select[name="location-select"]')
	if (selects.length > 0) {
		loadCities(selects)
	}
}

const insertCities = (citiesArray, selects) => {
	selects.forEach(select => {
		citiesArray.forEach(city => {
			const option = document.createElement('option')
			option.value = city.slug
			option.textContent = city.label
			select.appendChild(option)
		})
	})
}

const loadCities = selects => {
	fetch('/data/cities.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			return response.json()
		})
		.then(citiesArray => {
			insertCities(citiesArray, selects)
		})
		.catch(error => {
			console.error('Error cargando las ciudades:', error)
		})
}
