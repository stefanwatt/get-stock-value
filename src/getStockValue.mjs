#!/usr/bin/env node

import cron from 'node-cron'
import puppeteer from 'puppeteer'
import { createClient } from 'redis'

const stockBaseUrl = 'https://www.finanzen.net/aktien/'

const getStockValue = async (browser, stockUrl) => {
	const getElemTextAsNumber = async (elem) =>
		+(await page.evaluate((el) => el?.textContent, elem)).replace(',', '.')
	let value, trend, trendPercent
	console.log('opening tab...')
	const page = await browser.newPage()
	console.log(`going to url (${stockUrl})`)
	await page.goto(stockBaseUrl + stockUrl, { waitUntil: 'load', timeout: 0 })
	console.log('fetching stock value elem')

	const valueElem = await page.waitForSelector('#snapshot-value-fst-current-0 > span:nth-child(1)')
	value = await getElemTextAsNumber(valueElem)

	const trendElem = await page.waitForSelector('#snapshot-value-fst-absolute-0 > span:nth-child(1)')
	trend = await getElemTextAsNumber(trendElem)

	const trendPercentElem = await page.waitForSelector(
		'#snapshot-value-fst-relative-0 > span:nth-child(1)'
	)
	trendPercent = await getElemTextAsNumber(trendPercentElem)

	return {
		value,
		trend,
		trendPercent
	}
}

const client = createClient()

const main = async () => {
	client.on('error', (err) => console.log('Redis Client Error', err))

	await client.connect()

	const neededStocks = [
		{ title: 'BioNTech', url: 'biontech-aktie' },
		{ title: 'Bayer', url: 'bayer-aktie' },
		{ title: 'VW VF', url: 'volkswagen_vz-aktie' }
	]

	const browser = await puppeteer.launch()
	const stocks = []
	for (const stock of neededStocks) {
		stocks.push({
			...stock,
			...(await getStockValue(browser, stock.url))
		})
	}

	await browser.close()
	await client.set('stocks', JSON.stringify(stocks))

	await client.disconnect()
}

cron.schedule('*/15 * * * *', () => {
	main()
})
