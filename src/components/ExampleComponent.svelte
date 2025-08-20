<script>
	let count = 0;
</script>

<div class="fixed z-[1000] top-20 right-5 bg-primary text-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
	<h1 class="text-3xl font-bold mb-4">Contador: {count}</h1>
	<button
		class="bg-white text-dark px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors"
		on:click={() => count++}
	>
		Incrementar
	</button>
</div>
