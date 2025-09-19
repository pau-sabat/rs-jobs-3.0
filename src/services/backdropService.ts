/**
 * Singleton service to handle global backdrop state
 */
class BackdropService {
	private static instance: BackdropService
	private visible = false
	private zIndex = 60
	private callbacks: Set<(state: { visible: boolean; zIndex: number }) => void> = new Set()

	private constructor() {}

	public static getInstance(): BackdropService {
		if (!BackdropService.instance) {
			BackdropService.instance = new BackdropService()
		}
		return BackdropService.instance
	}

	public show(zIndex?: number): void {
		this.zIndex = zIndex || 60
		this.visible = true
		this.notify()
	}

	public hide(): void {
		this.visible = false
		this.notify()
	}

	public toggle(): void {
		this.visible = !this.visible
		this.notify()
	}

	public subscribe(callback: (state: { visible: boolean; zIndex: number }) => void): () => void {
		this.callbacks.add(callback)
		// initial call
		callback({ visible: this.visible, zIndex: this.zIndex })
		return () => this.callbacks.delete(callback)
	}

	private notify(): void {
		this.callbacks.forEach(cb => cb({ visible: this.visible, zIndex: this.zIndex }))
	}
}

export const backdropService = BackdropService.getInstance()
export { BackdropService }
