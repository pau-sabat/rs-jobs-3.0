export default function initLocationSelect() {
	loadCities()
}

const insertCities = citiesArray => {
    const locationSelect = document.querySelectorAll('select[name="location-select"]')
	locationSelect.forEach(select => {
		citiesArray.forEach(city => {
			const option = document.createElement('option')
			option.value = city.slug
			option.textContent = city.label
			select.appendChild(option)
		})
	})
}

const loadCities = () => {
	fetch('/data/cities.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			return response.json()
		})
		.then(citiesArray => {
			insertCities(citiesArray)
		})
		.catch(error => {
			console.error('Error cargando las ciudades:', error)
		})
}
