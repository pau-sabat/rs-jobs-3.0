export const languageMiddleware = (req, res, next) => {
	req.language = req.language || 'es'
	next()
}
