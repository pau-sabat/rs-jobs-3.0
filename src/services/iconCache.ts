// Cache global para loading de SVGs
export let svgCache = new Map<string, string>()
export let pendingFetches = new Map<string, Promise<string>>()
