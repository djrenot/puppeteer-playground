const puppeteer = require('puppeteer');
 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // declare console
  // page.on('console', msg => {
  //   for (let i = 0; i < msg._args.length; ++i)
  //     console.log(`${i}: ${msg._args[i]}`);
  // });

  try {
    // open the page
    await page.goto('https://store.jp.square-enix.com/category/11/SQEX_10849.html');
    // check the text in the table "detail_info"
    let stock = await page.$$('table.detail_info tbody tr td div')
    // return result of if text includes 品切れ中 or else
    let stock_tester = /品切れ中/
    console.log(stock)
    if ( stock_tester.test(stock.innerText) ) {
      console.log("OUT OF STOCK")
      // page.on('dialog', async (dialog) => {
      //   console.log(dialog.message());
      //   await dialog.dismiss();
      //   await browser.close();
      // });
    } else {
      // option: if else, check if 在庫あり
      //  if 在庫あり is true, ring the alarm
      console.log("STOCK STATUS UNAVAILABLE")
    }
    // await page.screenshot({ path: './image.png' });
  } catch (err) {
    // エラーが起きた際の処理
    console.log('// ERROR')
  } finally {
    console.log('// DONE')
    await browser.close();
  }
})();


