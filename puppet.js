const puppeteer = require('puppeteer');
// var twitterSelectors = require('./selectors.js');

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.setBypassCSP(true)
  await page.goto('https://twitter.com/stakeittestacc1')
  await page.screenshot({path: 'example.png'})

  try { await page.addScriptTag({path: './dist/selectors_bundle.js'}) } catch (e) { console.log(e) }

  let result = await page.evaluate(() => {
    let tweetsList = getTweetsFromDocument(document)
    let tweetsContentList = []

    for (let tweet of tweetsList) {
      let tweetContent = getTweetText(tweet)
      tweetsContentList.push(tweetContent)
    }

    return tweetsContentList
  })
  console.log(result)
  await browser.close()
})()
