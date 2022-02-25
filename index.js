const puppeteer = require('puppeteer');

(async () => {
  const argv = require('minimist')(process.argv.slice(2));
  console.log(argv);
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = argv.url ?? 'https://www.google.com';
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  const dir = argv.dir ?? '.';
  await page.pdf({ path: `${dir}/page-${Date.now()}.pdf`, format: 'a4' });

  await browser.close();
})();