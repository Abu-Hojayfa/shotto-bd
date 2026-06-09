const { expect } = require('chai');
const { buildDriver, BASE_URL, waitForElement, By, until } = require('./config');

describe('Signup Page', function () {
  let driver;

  before(async () => {
    driver = buildDriver();
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  beforeEach(async () => {
    await driver.get(`${BASE_URL}/signup`);
  });

  it('shows error on empty fields submission', async () => {
    const submitBtn = await waitForElement(driver, By.css('button[type="submit"]'));
    await submitBtn.click();

    const alert = await waitForElement(driver, By.css('.bg-destructive\\/10 span'));
    expect(await alert.getText()).to.include('Please fill in all required fields');
  });

  it('shows error if passwords do not match', async () => {
    const nameInput = await waitForElement(driver, By.id('name'));
    const emailInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const confirmPasswordInput = await driver.findElement(By.id('confirmPassword'));
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

    await nameInput.sendKeys('Test Citizen');
    await emailInput.sendKeys(`test_${Date.now()}@example.com`);
    await passwordInput.sendKeys('Password123!');
    await confirmPasswordInput.sendKeys('Password1234!');
    await submitBtn.click();

    const alert = await waitForElement(driver, By.css('.bg-destructive\\/10 span'));
    expect(await alert.getText()).to.include('Passwords do not match');
  });

  it('shows error if password is too weak', async () => {
    const nameInput = await waitForElement(driver, By.id('name'));
    const emailInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const confirmPasswordInput = await driver.findElement(By.id('confirmPassword'));
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

    await nameInput.sendKeys('Test Citizen');
    await emailInput.sendKeys(`test_${Date.now()}@example.com`);
    await passwordInput.sendKeys('weak');
    await confirmPasswordInput.sendKeys('weak');
    await submitBtn.click();

    const alert = await waitForElement(driver, By.css('.bg-destructive\\/10 span'));
    expect(await alert.getText()).to.include('Please choose a stronger password');
  });

  it('shows error if terms are not accepted', async () => {
    const nameInput = await waitForElement(driver, By.id('name'));
    const emailInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const confirmPasswordInput = await driver.findElement(By.id('confirmPassword'));
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

    await nameInput.sendKeys('Test Citizen');
    await emailInput.sendKeys(`test_${Date.now()}@example.com`);
    await passwordInput.sendKeys('Password123!');
    await confirmPasswordInput.sendKeys('Password123!');
    await submitBtn.click();

    const alert = await waitForElement(driver, By.css('.bg-destructive\\/10 span'));
    expect(await alert.getText()).to.include('Please accept the terms and conditions');
  });

  it('signs up successfully as citizen and redirects to dashboard', async () => {
    const nameInput = await waitForElement(driver, By.id('name'));
    const emailInput = await driver.findElement(By.id('email'));
    const passwordInput = await driver.findElement(By.id('password'));
    const confirmPasswordInput = await driver.findElement(By.id('confirmPassword'));
    const agreeTermsCheckbox = await driver.findElement(By.id('agreeTerms'));
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));

    const email = `test_signup_${Date.now()}@example.com`;

    await nameInput.sendKeys('Automation Citizen');
    await emailInput.sendKeys(email);
    await passwordInput.sendKeys('Password123!');
    await confirmPasswordInput.sendKeys('Password123!');
    
    try {
      await agreeTermsCheckbox.click();
    } catch (e) {
      await driver.executeScript('arguments[0].click();', agreeTermsCheckbox);
    }

    await submitBtn.click();

    await driver.wait(until.urlContains('/dashboard'), 10000);
    expect(await driver.getCurrentUrl()).to.include('/dashboard');

    const isLoggedIn = await driver.executeScript("return localStorage.getItem('isLoggedIn');");
    const userName = await driver.executeScript("return localStorage.getItem('userName');");
    expect(isLoggedIn).to.equal('true');
    expect(userName).to.equal('Automation Citizen');
  });
});
