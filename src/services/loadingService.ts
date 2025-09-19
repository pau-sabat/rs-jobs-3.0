/**
 * Singleton service to handle global loading state
 */
class LoadingService {
	private static instance: LoadingService
	private loading: boolean = false
	private callbacks: Set<(loading: boolean) => void> = new Set()

	private constructor() {}

	public static getInstance(): LoadingService {
		if (!LoadingService.instance) {
			LoadingService.instance = new LoadingService()
		}
		return LoadingService.instance
	}

	/**
	 * Shows the loading
	 */
	public show(): void {
		this.loading = true
		this.notifyCallbacks()
	}

	/**
	 * Hides the loading
	 */
	public hide(): void {
		if (this.loading) {
			this.loading = false
		}
		this.notifyCallbacks()
	}

	/**
	 * Forces hiding the loading (resets the counter)
	 */
	public forceHide(): void {
		this.loading = false
		this.notifyCallbacks()
	}

	/**
	 * Gets the current loading state
	 */
	public isLoading(): boolean {
		return this.loading
	}

	/**
	 * Subscribes a callback to receive change notifications
	 */
	public subscribe(callback: (loading: boolean) => void): () => void {
		this.callbacks.add(callback)
		// Returns function to unsubscribe
		return () => {
			this.callbacks.delete(callback)
		}
	}

	/**
	 * Notifies all callbacks of state change
	 */
	private notifyCallbacks(): void {
		this.callbacks.forEach(callback => callback(this.loading))
	}
}

export const loadingService = LoadingService.getInstance()

// Also export the class for special cases
export { LoadingService }
