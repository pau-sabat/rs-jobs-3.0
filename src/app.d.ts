// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { LoadingService } from './services/loadingService'
import type { BackdropService } from './services/backdropService'

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	interface Window {
		Loading: LoadingService
		Backdrop: BackdropService
	}
}

export {}
