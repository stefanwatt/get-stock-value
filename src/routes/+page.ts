export async function load({ fetch, params }) {
  const res = await fetch('/stock')
  const { stocks } = await res.json()
  return {
    stocks: stocks.map(stock => ({...stock, amount:30}))
  }
}
