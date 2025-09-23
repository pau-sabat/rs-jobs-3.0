interface City {
	slug: string;
	label: string;
}

export default function initLocationSelect(): void {
	const selects = document.querySelectorAll('select[id="location-select"]');
	if (selects.length > 0) {
		loadCities(selects);
	}
}

const insertCities = (citiesArray: City[], selects: NodeListOf<HTMLSelectElement>): void => {
	selects.forEach(select => {
		citiesArray.forEach(city => {
			const option = document.createElement('option');
			option.value = city.slug;
			option.textContent = city.label;
			select.appendChild(option);
		});
	});
};

const loadCities = (selects: NodeListOf<HTMLSelectElement>): void => {
	fetch('/data/cities.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((citiesArray: City[]) => {
			insertCities(citiesArray, selects);
		})
		.catch(error => {
			console.error('Error cargando las ciudades:', error);
		});
};
