import puppeteer from 'puppeteer';
import { expect, test, describe } from 'vitest';
import { loginUserDefault } from '../helpers/auth';
import userDefault from '../helpers/user';

describe('5. E2E: Dashboard Reports', () => {
  let browser: any;
  let page: any;
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

  test('should display dashboard metrics and allow PDF download', async () => {
    // Register and login
    const user = userDefault();
    await loginUserDefault({ page, baseUrl: baseUrl || '', credentials: user });
    

    // Navigate to dashboard
    await page.goto(`${baseUrl}/dashboard`);
    await page.waitForSelector('[data-testid="download-pdf-btn"]');

    // Debug: print the page content to diagnose missing metrics
    const pageContent = await page.content();
    console.log(pageContent);

    // Check if dashboard title is present
    const dashboardTitle = await page.$eval('[data-testid="dashboard-title"]', (el: Element) => el.textContent);
    expect(dashboardTitle).toContain('Employer Performance Dashboard');

    // Check if download button is present
    const downloadButton = await page.$('[data-testid="download-pdf-btn"]');
    expect(downloadButton).toBeTruthy();

    // Check metrics
    await page.waitForSelector('[data-testid="dashboard-metric-total-strategies"]');
    const totalStrategies = await page.$eval('[data-testid="dashboard-metric-total-strategies"]', (el: Element) => el.textContent);
    expect(Number(totalStrategies)).not.toBeNaN();

    // Check charts
    const pieChart = await page.$('[data-testid="dashboard-pie-chart"]');
    expect(pieChart).toBeTruthy();
    const barChart = await page.$('[data-testid="dashboard-bar-chart"]');
    expect(barChart).toBeTruthy();

    // Test PDF download functionality
    await page.click('[data-testid="download-pdf-btn"]');
    // Wait for download to start (adjust timeout as needed)
    await new Promise(res => setTimeout(res, 2000));

    // Verify the dashboard content is present for PDF generation
    const dashboardContent = await page.$('#dashboard-pdf-content');
    expect(dashboardContent).toBeTruthy();
  }, 30000);
}); 