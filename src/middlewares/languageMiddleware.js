export const languageMiddleware = (req, res, next) => {
	res.locals.language = req.language
	next()
}
