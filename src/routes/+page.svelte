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
	<div class="flex justify-center flex-wrap">
		{#each data.stocks as stock}
			<div class="bg-slate-600 rounded-lg mb-2 mr-2 p-2 w-36 ">
				<div
					class="text-center"
				>
					{stock.title}
				</div>
				<div class="justify-center flex items-center text-2xl font-bold text-sky-200">
					<span class="ml-2">
						{(stock.value * stock.amount).toFixed(2)}€
					</span>
				</div>
				<div class="flex justify-center items-center text-sm">
					<span class="ml-2">
						<strong>{stock.amount}</strong> x {stock.value}€
					</span>
				</div>
				<div
					class:text-red-400={stock.trend < 0}
					class:text-emerald-200={stock.trend > 0}
					class="text-sm flex justify-center"
				>
					<span>
						{#if stock.trend > 0}
							↗︎
						{/if}

						{#if stock.trend < 0}
							↘︎
						{/if}
						<span class="mx-1" />
						{stock.trend} €</span
					>
					<span class="mx-1" />
					<span>{stock.trendPercent}%</span>
				</div>
			</div>
		{/each}
	</div>
