interface Category {
	slug: string;
	name: string;
	icon: string;
}

export default function initCategoriesSelect(): void {
	const selects = document.querySelectorAll('select[id="category-select"]');
	if (selects.length > 0) {
		loadCategories(selects);
	}
}

const insertCategories = (categoriesArray: Category[], selects: NodeListOf<HTMLSelectElement>): void => {
	selects.forEach(select => {
		categoriesArray.forEach(category => {
			const option = document.createElement('option');
			option.value = category.slug;
			option.textContent = `${category.icon} ${category.name}`;
			select.appendChild(option);
		});
	});
};

const loadCategories = (selects: NodeListOf<HTMLSelectElement>): void => {
	fetch('/data/categories.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((categoriesArray: Category[]) => {
			insertCategories(categoriesArray, selects);
		})
		.catch(error => {
			console.error('Error cargando las categorías:', error);
		});
};
