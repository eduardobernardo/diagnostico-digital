const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
  await page.goto('http://localhost:3000');
  
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  
  console.log(`scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}`);
  
  if (scrollWidth > clientWidth) {
    console.log("HORIZONTAL OVERFLOW DETECTED!");
    // find the elements causing overflow
    const overflowElements = await page.evaluate(() => {
      const elements = document.querySelectorAll('*');
      const bodyWidth = document.body.clientWidth;
      const overflowNodes = [];
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.right > bodyWidth || rect.width > bodyWidth) {
          overflowNodes.push({
            tag: el.tagName,
            className: el.className,
            width: rect.width,
            right: rect.right
          });
        }
      }
      return overflowNodes;
    });
    console.log("Elements causing overflow:", overflowElements);
  } else {
    console.log("No horizontal overflow detected.");
  }
  
  await browser.close();
})();
