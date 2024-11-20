import puppeteer, { Browser, Page } from 'puppeteer';
import { expect, test, describe, beforeAll, afterAll } from 'vitest';
const VITE_BASE_FRONT_URL: string = 'http://localhost:5173';

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));
// Generate new user to test it
// TODO: add faker to do automatically this
// TODO: Define env variable to origin
describe('Sign up and after login', () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
  });

  test('Create user and login', async () => {
    page = await browser.newPage();

    await page.goto(`${VITE_BASE_FRONT_URL}/signup`);

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', 'test4');

    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', 't4@mail.com');

    await page.waitForSelector('input[name="password"]');
    await page.type('input[name="password"]', 'Pa12312319-');

    await page.waitForSelector('input[name="confirmPasswd"]');
    await page.type('input[name="confirmPasswd"]', 'Pa12312319-');

    await page.waitForSelector('#select-type-user');
    await page.click('#select-type-user');
    await page.waitForSelector('li[data-value="EMPLOYER"]');
    await page.click('li[data-value="EMPLOYER"]');

    await page.waitForSelector('#submit-signup', { visible: true });
    await delay(2000);
    await page.click('button[id="submit-signup"]');
    await delay(2000);

    const currentUrl = page.url();
    expect(currentUrl).toBe(`${VITE_BASE_FRONT_URL}/home`);

    //expect(notificationText).toContain('Welcome');
    expect(1).toBe(1);
  }, 8000);

  afterAll(() => browser.close());
});
