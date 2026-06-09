const { expect } = require('chai');
const { buildDriver, BASE_URL, waitForElement, By, until } = require('./config');

describe('Login Page', function () {
  let driver;

  before(async () => {
    driver = buildDriver();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  beforeEach(async () => {
    await driver.get(`${BASE_URL}/login`);
  });

  it('shows error on empty fields submission', async () => {
    const submitBtn = await waitForElement(driver, By.css('button[type="submit"]'));
    await submitBtn.click();

    const alert = await waitForElement(driver, By.css('.bg-destructive\\/10 span'));
    expect(await alert.getText()).to.include('Please fill in all fields');
  });

  it('shows error for invalid credentials', async () => {
    const emailInput = await waitForElement(driver, By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys('invalid_user_12345@example.com');
    await passwordInput.sendKeys('Password123!');
    await submitBtn.click();

    const alert = await waitForElement(driver, By.css('.bg-destructive\\/10 span'));
    const text = (await alert.getText()).toLowerCase();
    
    expect(text).to.satisfy(
      val => val.includes('invalid') || val.includes('failed') || val.includes('error') || val.includes('not found')
    );
  });

  it('logs in successfully and redirects to dashboard', async () => {
    const email = `test_login_${Date.now()}@example.com`;
    const password = 'Password123!';
    const fullName = 'Automation User';

    const api = process.env.VITE_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${api}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password, role: 'citizen' })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(`Test user setup failed: ${err.message || res.statusText}`);
    }

    const emailInput = await waitForElement(driver, By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

    await emailInput.sendKeys(email);
    await passwordInput.sendKeys(password);
    await submitBtn.click();

    await driver.wait(until.urlContains('/dashboard'), 10000);
    expect(await driver.getCurrentUrl()).to.include('/dashboard');

    const isLoggedIn = await driver.executeScript("return localStorage.getItem('isLoggedIn');");
    const userEmail = await driver.executeScript("return localStorage.getItem('userEmail');");
    expect(isLoggedIn).to.equal('true');
    expect(userEmail).to.equal(email);
  });
});
