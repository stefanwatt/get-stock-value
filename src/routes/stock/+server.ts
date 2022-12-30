import { json } from '@sveltejs/kit'

import { createClient } from 'redis'
import type { RequestEvent } from './$types'

const client = createClient()

client.on('error', (err) => console.log('Redis Client Error', err))

await client.connect()

// await client.disconnect();
/** @type {import('./$types').RequestHandler} */
export async function GET(event: RequestEvent) {
  const jsonString = await client.get('stocks')
  if (!jsonString) {
    return json({
      ok: false
    })
  }
  const stocks = JSON.parse(jsonString)
  return json({
    ok: true,
    stocks
  })
}

export async function POST(event: RequestEvent) {
  const { value } = await event.request.json()

  const stocks = [
    {
      title: 'BioNTech',
      symbol: 'BNTX',
      stockValue: 144,
      amount: 30,
      change: -1.85,
      changePercent: -1.27
    },
    {
      title: 'Bayer',
      symbol: 'BAYZF',
      stockValue: 48.77,
      amount: 10,
      change: -0.36,
      changePercent: -0.72
    },
    {
      title: 'VW VF',
      symbol: 'BAYZF',
      stockValue: 116.22,
      amount: 25,
      change: 0.04,
      changePercent: 0.03
    }
  ]
  await client.set('stocks', JSON.stringify(stocks))
  return json({
    ok: true
  })
}
