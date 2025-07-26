import puppeteer, { HTTPResponse } from 'puppeteer';
import { expect, test, describe } from 'vitest';
import { loginUserDefault } from '../helpers/auth';
import userDefault from '../helpers/user';

function randomPost() {
  const id = Math.floor(Math.random() * 1000000);
  return {
    title: `Test Post ${id}`,
    description: `This is a test post description ${id}`,
    tags: `tag${id}`,
    category: 'Marketing',
    emoji: '🚀',
  };
}

describe('3. E2E: CRUD Posts', () => {
  let browser: any;
  let page: any;
  if (!process.env.VITE_BASE_FRONT_URL) {
  throw new Error('VITE_BASE_FRONT_URL is not set');
}
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

  test('should create, read, update, and delete a post', async () => {
    // Register and login
    const user = userDefault();
    await loginUserDefault({ page, baseUrl, credentials: user });

    // Go to posts page
    await page.goto(`${baseUrl}/posts`);

    // Click add new post (FAB)
    await page.waitForSelector('button[aria-label="add"]');
    await page.click('button[aria-label="add"]');

    // Fill post form
    const post = randomPost();
    await page.waitForSelector('input[name="title"]');
    await page.type('input[name="title"]', post.title);
    await page.type('input[name="description"]', post.description);
    await page.type('input[name="tags"]', post.tags);

    // Fill category (Autocomplete)
    await page.click('#category-select');
    await page.type('#category-select', post.category);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    // Save new post, select dial after option
    await page.click('div[id="speed-dial-posts"] > button');
    await page.click('[id="speed-dial-posts-action-2"]');

    // Wait for the POST /api/v1/posts response and extract the created post ID
    const postResponse = await page.waitForResponse(
      (response: HTTPResponse) => response.url().includes('/api/v1/posts') && response.request().method() === 'POST'
    );
    const postResponseData = await postResponse.json();
    const createdPostId = postResponseData.post.id;
    
    // Wait for the post to appear in the list
    await new Promise(res => setTimeout(res, 3000));
    
    await page.goto(`${baseUrl}/posts`);

    // Debug: print all post titles on the page
    await page.waitForSelector('.post-title');
    const titles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.post-title')).map(el => el.textContent);
    });
    const postExists = titles.includes(post.title);
    expect(postExists).toBe(true);

    // Now use the real ID
    const titleSelector = `[id="btn-edit-${createdPostId}"]`;
    try {
      await page.waitForSelector(titleSelector, { timeout: 5000 });
      await page.click(titleSelector, { clickCount: 2 });
    } catch (err) {
      // Print the page HTML for debugging
      const html = await page.content();
      console.error('Could not find selector:', titleSelector);
      console.error('Page HTML:', html);
      throw err;
    }

    await page.waitForSelector('input[name="title"]');
    // Print the value of the title input before update
    const beforeUpdateTitle = await page.$eval('input[name="title"]', (el: any) => el.value);
    console.log('Title before update:', beforeUpdateTitle);

    // Listen for PATCH/PUT requests to /api/v1/posts
    page.on('response', async (response: HTTPResponse) => {
      if ((response.url().includes('/api/v1/posts') && ['PATCH', 'PUT'].includes(response.request().method()))) {
        const data = await response.json().catch(() => ({}));
        console.log('Update response:', data);
      }
    });

    // Update the post title
    const updatedTitle = post.title + ' Updated';
    await page.click('input[name="title"]', { clickCount: 3 });
    await page.type('input[name="title"]', updatedTitle);

    // Print the value of the title input after update
    const afterUpdateTitle = await page.$eval('input[name="title"]', (el: any) => el.value);
    console.log('Title after update:', afterUpdateTitle);

    // Save new post, select dial after option
    await page.click('div[id="speed-dial-posts"] > button');
    await page.click('[id="speed-dial-posts-action-2"]');
    await new Promise(res => setTimeout(res, 2000));

    // Reload posts page after update
    await page.goto(`${baseUrl}/posts`);
    await page.waitForSelector('.post-title');
    const updatedTitles = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.post-title')).map(el => el.textContent);
    });
    const updatedEditButtonIds = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('[id^="btn-edit-"]')).map(el => el.id);
    });
    console.log('All post titles after update:', updatedTitles);
    console.log('All edit button IDs after update:', updatedEditButtonIds);
    if (!updatedTitles.includes(updatedTitle)) {
      const html = await page.content();
      console.error('Updated post title not found in list after update. Page HTML:', html);
      throw new Error('Updated post title not found in list after update');
    }

    // --- Delete post ---
    // Go to the updated post's edit page (double-click)
    const updatedTitleSelector = `[id="btn-edit-${createdPostId}"]`;
    console.log("Edit: ", updatedTitleSelector);
    await page.waitForSelector(updatedTitleSelector);
    await page.click(updatedTitleSelector, { clickCount: 2 });

    // Delete this
    console.log('About to click speed-dial-posts button');
    try {
      await page.waitForSelector('div[id="speed-dial-posts"] > button', { timeout: 3000 });
      console.log('Found speed-dial-posts button');
      await page.click('div[id="speed-dial-posts"] > button');
    } catch (err) {
      const html = await page.content();
      console.error('Could not find speed-dial-posts button');
      console.error('Page HTML:', html);
      throw err;
    }
    console.log('About to click delete action');
    try {
      await page.waitForSelector('[id="speed-dial-posts-action-0"]', { timeout: 3000 });
      console.log('Found delete action');
      await page.click('[id="speed-dial-posts-action-0"]');
    } catch (err) {
      const html = await page.content();
      console.error('Could not find delete action');
      console.error('Page HTML:', html);
      throw err;
    }
    console.log('Clicked delete button');
    try {
      await page.waitForSelector(updatedTitleSelector, { hidden: true, timeout: 5000 });
      console.log('Edit button disappeared after delete');
    } catch (err) {
      const html = await page.content();
      console.error('Edit button did NOT disappear:', updatedTitleSelector);
      console.error('Page HTML after delete:', html);
      throw err;
    }

    // Check post is no longer present
    await page.goto(`${baseUrl}/posts`);
    console.log('Navigated to posts after delete');
    const deletedPostExists = await page.evaluate((title: string) => {
      return Array.from(document.querySelectorAll('.post-title')).some(el => el.textContent === title);
    }, updatedTitle);
    console.log('Deleted post exists in list:', deletedPostExists);
    expect(deletedPostExists).toBe(false);
  }, 60000);
}); 