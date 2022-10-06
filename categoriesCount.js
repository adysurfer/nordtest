// Task 2: Click on career page button and then counting the total job categories
//add Puppeteer library
const pt = require('puppeteer');

pt.launch({ headless: true }).then(async browser => {
    //browser new page
    const page = await browser.newPage();
    //set viewpoint of browser page
    await page.setViewport({ width: 1920, height: 1080 })
    //launch URL
    await page.goto('https://www.tesonet.com/')

    //identify element with xpath then click
    const x = await page.waitForXPath('//a[@href = "https://tesonet.com/career/"]')
    await x.click({ clickCount: 1 })

    //identify element by xpath and  wait for it to appear in DOM
    await page.waitForXPath('//*[contains(@class, "career-lever-v3__job-category-box")]/div[1]/h4')

    //count total job categories on career page
    const countJobCategories = await page.$$eval('.career-lever-v3__job-category-box', element => element.length)
    console.log('Total job categories on tesonet career page are :'+countJobCategories)

    //browser close
    await browser.close()
})