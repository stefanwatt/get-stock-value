<script lang="ts">
	import lineChart from '$lib/img/line-chart.svg';
  export let data;
</script>

<div class="flex justify-center relative">
	<img class="w-72 h-72" src={lineChart} alt="line-chart.svg" />
	<div
		class="absolute bottom-0 bg-amber-100 text-slate-600 font-mono py-2 px-4 rounded-lg flex justify-center items-center text-4xl"
	>
		STOCK TICKER
	</div>
</div>

<div class="my-4" />
<div class="flex justify-center">
	<div class="flex flex-wrap">
		{#each data.stocks as stock}
			<div class="bg-slate-600 rounded-lg mb-2 mr-2 p-2 w-48">
				<div
					class="text-center"
				>
					{stock.title}
				</div>
				<div class="justify-center flex items-center text-2xl font-bold text-sky-200">
					<span class="ml-2">
						{(stock.stockValue * stock.amount).toFixed(2)}€
					</span>
				</div>
				<div class="flex justify-center items-center text-sm">
					<span class="ml-2">
						<strong>{stock.amount}</strong> x {stock.stockValue}€
					</span>
				</div>
				<div
					class:text-red-400={stock.change < 0}
					class:text-emerald-200={stock.change > 0}
					class="text-sm flex justify-center"
				>
					<span>
						{#if stock.change > 0}
							↗︎
						{/if}

						{#if stock.change < 0}
							↘︎
						{/if}
						<span class="mx-1" />
						{stock.change} €</span
					>
					<span class="mx-1" />
					<span>{stock.changePercent}%</span>
				</div>
			</div>
		{/each}
	</div>
</div>
