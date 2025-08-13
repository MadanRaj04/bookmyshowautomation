const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Apply the stealth plugin, which patches many automation signals like navigator.webdriver, WebGL, plugins, etc.
puppeteer.use(StealthPlugin());


const browser = await puppeteer.launch({ headless: false }); // Headed mode reduces bot detection

const page = await browser.newPage();

// Set a realistic user-agent to match the IP’s region and browser version
await page.setUserAgent(
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
);

// Randomize viewport slightly to avoid fingerprinting from consistent dimensions
await page.setViewport({
  width: Math.floor(1024 + Math.random() * 100),
  height: Math.floor(768 + Math.random() * 100),
});