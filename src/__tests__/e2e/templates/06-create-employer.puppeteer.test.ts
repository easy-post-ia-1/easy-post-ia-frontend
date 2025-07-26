import puppeteer from 'puppeteer';
import { expect, test, describe } from 'vitest';
import { loginUserDefault } from '../helpers/auth';
import userDefault from '../helpers/user';

function randomTemplate() {
  const id = Math.floor(Math.random() * 1000000);
  return {
    title: `Test Template ${id}`,
    description: `This is a test template description ${id}`,
    tags: `tag${id}`,
    category: 'Marketing',
    emoji: '🚀',
  };
}

describe('6. E2E: Employer Template Creation', () => {
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

  test('should allow employer to create a template', async () => {
    const user = userDefault();
    await loginUserDefault({ page, baseUrl: baseUrl || '', credentials: user });

    // Go to posts page
    await page.goto(`${baseUrl}/posts`);
    // Wait for post edit buttons to appear
    await page.waitForSelector('[id^="btn-edit-"]');
    // Get all edit buttons
    const editButtons = await page.$$('[id^="btn-edit-"]');
    if (editButtons.length > 0) {
      // Pick a random edit button and click it (double click if needed)
      const randomIndex = Math.floor(Math.random() * editButtons.length);
      await editButtons[randomIndex].click({ clickCount: 2 });
      // Wait for the post form to load
      await page.waitForSelector('input[name="title"]');
    }
    // Open SpeedDial/FAB for templates
    await page.click('div[id="speed-dial-posts"] > button');
    // Click the action to open the template modal (usually index 1 for "Templates")
    await page.waitForSelector('[id="speed-dial-posts-action-1"]');
    await page.click('[id="speed-dial-posts-action-1"]');
    // Now the template modal is open
    await page.waitForSelector('[data-testid="open-create-template-btn"]');
    await page.click('[data-testid="open-create-template-btn"]');
    await page.waitForSelector('[data-testid="template-title-input"]');
    // Fill template form
    const template = randomTemplate();
    await page.type('[data-testid="template-title-input"]', template.title);
    await page.type('[data-testid="template-description-input"]', template.description);
    await page.type('[data-testid="template-tags-input"]', template.tags);
    // Select category using MUI Select interaction
    await page.click('[data-testid="template-category-select"]');
    await page.waitForSelector(`li[data-value="${template.category}"]`);
    await page.click(`li[data-value="${template.category}"]`);
    await page.type('[data-testid="template-emoji-input"]', template.emoji);
    // Ensure all fields are filled before submitting
    await page.evaluate(() => {
      const title = (document.querySelector('[data-testid="template-title-input"]') as HTMLInputElement)?.value;
      const description = (document.querySelector('[data-testid="template-description-input"]') as HTMLInputElement)?.value;
      const tags = (document.querySelector('[data-testid="template-tags-input"]') as HTMLInputElement)?.value;
      const category = (document.querySelector('[data-testid="template-category-select"]') as HTMLInputElement)?.value;
      const emoji = (document.querySelector('[data-testid="template-emoji-input"]') as HTMLInputElement)?.value;
      return !!(title && description && tags && category && emoji);
    });
    await page.click('[data-testid="template-create-submit"]');
    // Wait for modal to close or success message
    await new Promise(res => setTimeout(res, 1000));

    // Switch to TEAM templates tab
    await page.waitForSelector('[data-testid="tab-team"]');
    await page.click('[data-testid="tab-team"]');

    await new Promise(res => setTimeout(res, 2000));

    // Check template appears in list
    await page.evaluate((title: string) => {
      return Array.from(document.querySelectorAll('[data-testid="template-title"]')).some(el => el.textContent === title);
    }, template.title);

    // Select the template in the modal using the card's data-testid
    const templateCards = await page.$$('[data-testid="template-card"]');
    let found = false;
    for (const card of templateCards) {
      const cardTitle = await card.$eval('[data-testid="template-title"]', (el: any) => el.textContent);
      if (cardTitle === template.title) {
        await card.click();
        found = true;
        break;
      }
    }
    expect(found).toBe(true);

    // Click the apply button (now it should say 'Apply')
    await page.click('[data-testid="open-create-template-btn"]');
    // Wait for the modal to close
    await new Promise(res => setTimeout(res, 2000));

    // Check that the post form fields are filled with the template's data
    // Title
    const postTitle = await page.$eval('input[name="title"]', (el: any) => el.value);
    expect(postTitle).toBe(template.title);
    // Description
    const postDescription = await page.$eval('input[name="description"]', (el: any) => el.value);
    expect(postDescription).toBe(template.description);
    // Tags
    const postTags = await page.$eval('input[name="tags"]', (el: any) => el.value);
    expect(postTags).toBe(template.tags);
    // Category (Autocomplete, check value)
    const postCategory = await page.$eval('#category-select', (el: any) => el.value);
    expect(postCategory).toBe(`${template.emoji} ${template.category}`);
  }, 60000);
});