/**
 * Middleware para renderizar vistas usando un nombre
 * @param {string} viewName - Nombre de la vista (sin extensión .pug)
 * @param {object} locals - Variables locales para pasar a la vista
 * @returns {Function} Middleware function
 */
const render = (viewName, locals = {}) => {
	return (req, res) => {
		// Combinar variables locales con datos de la request
		const renderData = {
			...locals,
			...req.locals,
			...req.query,
			...req.params,
			t: req.t
		}

		// Renderizar la vista
		res.render(`pages/${viewName}`, renderData)
	}
}

/**
 * Middleware para renderizar vistas con datos dinámicos
 * @param {string} viewName - Nombre de la vista
 * @param {Function} dataProvider - Función que retorna los datos para la vista
 * @returns {Function} Middleware function
 */
const renderWithData = (viewName, dataProvider) => {
	return async (req, res, next) => {
		try {
			const data = await dataProvider(req)
			const renderData = {
				...data,
				...req.locals,
				...req.query,
				...req.params,
				t: req.t
			}

			res.render(`pages/${viewName}`, renderData)
		} catch (error) {
			next(error)
		}
	}
}

export {
	render,
	renderWithData
}
