require('dotenv').config();
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';
const DEFAULT_TIMEOUT = 10000;

function buildDriver() {
  const options = new chrome.Options();
  
  if (process.env.HEADLESS === 'true') {
    options.addArguments('--headless=new');
  }

  options.addArguments(
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1280,1024'
  );

  return new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
}

async function waitForElement(driver, locator, timeout = DEFAULT_TIMEOUT) {
  await driver.wait(until.elementLocated(locator), timeout);
  const element = await driver.findElement(locator);
  await driver.wait(until.elementIsVisible(element), timeout);
  return element;
}

module.exports = {
  BASE_URL,
  DEFAULT_TIMEOUT,
  buildDriver,
  waitForElement,
  By,
  until
};
