import puppeteer from 'puppeteer';

export async function fetchGFG(username) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    await page.goto(`https://www.geeksforgeeks.org/user/${username}/`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

        const data = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll('.scoreCard_head_left--score__oSi_x'));
        return {
            codingScore: elements[0]?.innerText?.trim() || '0',
            problemsSolved: elements[1]?.innerText?.trim() || '0',
            contestRating: elements[2]?.innerText?.trim() || '0',
        };
        });


    return data;
  } catch (error) {
    console.error(`GFG error: ${error.message}`);
    return null;
  } finally {
    if (browser) await browser.close();
  }
}