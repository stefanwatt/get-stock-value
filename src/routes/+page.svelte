<script lang="ts">
	import lineChart from '$lib/img/line-chart.svg';
	import { onMount } from 'svelte';
  interface Stock {
    title:string;
    amount:number;
    value:number;
    trend:number;
    trendPercent:number
  }
	export let data: {stocks:Stock[]};
	let modalVisible = false;
	let currentStock:Stock;
	let changedAmount = 1;
	const showModal = (stock:Stock) => {
		modalVisible = true;
		currentStock = stock;
	};
  let mounted = false

	const updateAmount = () => {
		data.stocks = data.stocks.map((stock) =>
			stock.title === currentStock.title ? { ...stock, amount: changedAmount } : stock
		);
    data.stocks.forEach(stock => localStorage.setItem(stock.title,stock.amount.toString()))
    modalVisible = false
	};

  onMount(()=>{
		data.stocks = data.stocks.map((stock) =>({
      ...stock,
      amount: +(localStorage.getItem(stock.title) || 30)
    }));
    mounted = true
  })
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
{#if mounted}
<div class="flex justify-center flex-wrap">
	{#each data.stocks as stock}
		<div
			on:click={() => {
				showModal(stock);
			}}
			class="bg-slate-600 rounded-lg mb-2 mr-2 p-2 w-36 cursor-pointer"
		>
			<div class="text-center">
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

<div class:modal-open={modalVisible} class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Change amount</h3>
		<p class="py-4">Plase enter the amount of stocks you own.</p>
		<input bind:value={changedAmount} type="number" class="input input-bordered w-full" />
		<div class="flex mt-2 w-full block">
			<button on:click={()=>{modalVisible = false}} class="btn bg-red-400 text-slate-800 grow">🗙 Cancel</button>
      <span class="mx-1"></span>
			<button on:click={updateAmount} class="btn bg-emerald-300 text-slate-800 grow">💾 Confirm</button>
		</div>
	</div>
</div>
{/if}
