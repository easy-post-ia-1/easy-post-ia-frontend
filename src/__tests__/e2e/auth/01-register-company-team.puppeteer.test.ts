import puppeteer, { Browser, Page } from 'puppeteer';
import { expect, test, describe } from 'vitest';

// This test uses fixed company and team codes for deterministic E2E registration

describe('1b. E2E: User Registration with Fixed Company and Team Code', () => {
  let browser: Browser;
  let page: Page;
  const baseUrl = process.env.VITE_BASE_FRONT_URL;

  beforeAll(async () => {
    const headless = process.env.VITE_E2E_HEADLESS === 'true';
    const slowMo = process.env.VITE_E2E_SLOWMO ? parseInt(process.env.VITE_E2E_SLOWMO, 10) : 0;
    browser = await puppeteer.launch({ headless, slowMo });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test('should register with specific company and team code', async () => {
    // Use environment variable for password, randomize username/email to avoid collisions
    const randomSuffix = Math.floor(Math.random() * 1000000);
    const user = {
      username: `fixeduser${randomSuffix}`,
      email: `fixedusers${randomSuffix}@mail.com`,
      password: process.env.VITE_E2E_LOGIN_USER_PASSWORD || 'CHANGE_PASSWROD',
      company_code: 'COMPANY123',
      team_code: 'TEAM456',
      team_name: 'QA Team'
    };

    await page.goto(`${baseUrl}/signup`);
    await page.waitForSelector('[data-testid="username-input"]');
    await page.type('[data-testid="username-input"]', user.username);
    await page.waitForSelector('[data-testid="password-input"]');
    await page.type('[data-testid="password-input"]', user.password);
    await page.waitForSelector('[data-testid="confirmPasswd-input"]');
    await page.type('[data-testid="confirmPasswd-input"]', user.password);
    await page.waitForSelector('[data-testid="email-input"]');
    await page.type('[data-testid="email-input"]', user.email);

    // Fill in company and team codes
    await page.waitForSelector('[data-testid="company-code-input"]');
    await page.type('[data-testid="company-code-input"]', user.company_code);
    await page.waitForSelector('[data-testid="team-code-input"]');
    await page.type('[data-testid="team-code-input"]', user.team_code);

    // Select Employer role (MUI Select is not a native <select>)
    await page.waitForSelector('#select-type-user');
    await page.click('#select-type-user');
    await page.waitForSelector('li[data-value="EMPLOYER"]');
    await page.click('li[data-value="EMPLOYER"]');

    await page.click('button[id="submit-signup"]');
    await page.click('button[id="submit-signup"]');

    // Wait 3 seconds for navigation
    await new Promise(res => setTimeout(res, 3000));
    const url = page.url();
    const isHome = url.endsWith('/home') || url.endsWith('/');
    expect(isHome).toBe(true);
    if (!isHome) {
      throw new Error(`Unexpected URL after login: ${url}`);
    }
  }, 20000);
});
