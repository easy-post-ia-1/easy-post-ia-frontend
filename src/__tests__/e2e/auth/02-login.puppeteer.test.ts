import puppeteer from 'puppeteer';
import { expect, test, describe } from 'vitest';
import userDefault from '../helpers/user';

describe('2. E2E: User Login', () => {
  let browser: any;
  let page: any;
  const baseUrl = process.env.VITE_BASE_FRONT_URL;

  beforeAll(async () => {
    const headless = process.env.VITE_E2E_HEADLESS === 'true';
    const slowMo = process.env.VITE_E2E_SLOWMO ? parseInt(process.env.VITE_E2E_SLOWMO, 30) : 0;
    browser = await puppeteer.launch({ headless, slowMo });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should login an existing user and store JWT in Zustand', async () => {
    const user = userDefault();
    // Logout if needed (simulate logout if UI available)
    await page.goto(`${baseUrl}/logout`);
    // Now login
    await page.goto(`${baseUrl}/login`);
    await page.waitForSelector('input[id="outlined-adornment-username"]');
    await page.type('input[id="outlined-adornment-username"]', user.username);
    await page.waitForSelector('input[id="outlined-adornment-password"]');
    await page.type('input[id="outlined-adornment-password"]', user.password);

    await page.click('button[id="submit-login"]');

    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Wait 3 seconds for navigation
    await new Promise(res => setTimeout(res, 3000));
    const url = page.url();
    const isHome = url.endsWith('/home') || url.endsWith('/');
    expect(isHome).toBe(true);
    if (!isHome) {
      throw new Error(`Unexpected URL after login: ${url}`);
    }
  }, 30000);
}); 