const dayjs = require('dayjs')
const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/es')

// Configurar dayjs
dayjs.extend(relativeTime)
dayjs.locale('es')

module.exports = {
	dayjs,
}
