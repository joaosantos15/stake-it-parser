const { expect } = require('chai')

describe('Webpage Selectors Tests', function () {
  let page
  this.timeout(15000)

  before(async function () {
    page = await browser.newPage()
    page.setBypassCSP(true)
    await page.goto('https://twitter.com/stakeittestacc1')
    // await page.screenshot({path: 'example.png'})

    try { await page.addScriptTag({path: './dist/selectors_bundle.js'}) } catch (e) { console.log(e) }
  })

  after(async function () {
    await page.close()
  })

  it('Should get the tweet content', async function () {
    // expect(await page.title()).to.eql('Puppeteer Mocha')
    let result = await page.evaluate(() => {
      let tweetsList = getTweetsFromDocument(document)
      let tweetContent = getTweetText(tweetsList[0])
      return tweetContent
    })
    let expectedTweet = 'lalala @itsjoaosantos #stakeit @8798776gh @77fgfg6s'.replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, '')
    expect(result).to.equal(expectedTweet)
  })

  it('Should have only one tweet', async function () {
    let result = await page.evaluate(() => {
      let tweetsList = getTweetsFromDocument(document)
      return tweetsList.length
    })
    expect(result).to.equal(1)
  })
})

/*
  it('should have a heading', async function () {
    const HEADING_SELECTOR = 'h1'
    let heading

    await page.waitFor(HEADING_SELECTOR)
    heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText)

    expect(heading).to.eql('Page Title')
  })

  it('should have a single content section', async function () {
    const BODY_SELECTOR = '.main-content'

    await page.waitFor(BODY_SELECTOR)

    expect(await page.$$(BODY_SELECTOR)).to.have.lengthOf(1)
  }) */
