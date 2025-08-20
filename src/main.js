// Punto de entrada principal para Vite
// Aquí puedes importar tus componentes de Svelte cuando los tengas

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSvelte);
} else {
    initializeSvelte();
}

function initializeSvelte() {
    console.log('svelte initialized')
}
