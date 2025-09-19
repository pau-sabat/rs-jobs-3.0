export default function initCategoriesSelect() {
	const selects = document.querySelectorAll('select[id="category-select"]')
	if (selects.length > 0) {
		loadCategories(selects)
	}
}

const insertCategories = (categoriesArray, selects) => {
	selects.forEach(select => {
		categoriesArray.forEach(category => {
			const option = document.createElement('option')
			option.value = category.slug
			option.textContent = `${category.icon} ${category.name}`
			select.appendChild(option)
		})
	})
}

const loadCategories = selects => {
	fetch('/data/categories.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`)
			}
			return response.json()
		})
		.then(categoriesArray => {
			insertCategories(categoriesArray, selects)
		})
		.catch(error => {
			console.error('Error cargando las categorías:', error)
		})
}
