import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import 'dayjs/locale/es.js'

// Configurar dayjs
dayjs.extend(relativeTime)
dayjs.locale('es')

export default dayjs
