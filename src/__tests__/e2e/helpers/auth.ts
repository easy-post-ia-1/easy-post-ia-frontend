import { LoginUserOptions } from "./interfaces/LoginInterface";

export async function loginUserDefault({ page, baseUrl, credentials }: LoginUserOptions) {
  await page.goto(`${baseUrl}/login`);
  await page.waitForSelector('input[id="outlined-adornment-username"]');
  await page.type('input[id="outlined-adornment-username"]', credentials.username);
  await page.waitForSelector('input[id="outlined-adornment-password"]');
  await page.type('input[id="outlined-adornment-password"]', credentials.password);

  await page.click('button[id="submit-login"]');
  await page.click('button[id="submit-login"]');

  await new Promise(res => setTimeout(res, 3000));
  // Wait a bit for navigation/redirect
  await new Promise(res => setTimeout(res, 3000));
  const url = page.url();
  const isHome = url.endsWith('/home') || url.endsWith('/');
  if (!isHome) {
    throw new Error(`Login failed: Unexpected URL after login: ${url}`);
  }

  // If React Tour is present, close it
  const tourCloseBtn = await page.$('button.reactour__close-button');
  if (tourCloseBtn) {
    await tourCloseBtn.click();
    // Optionally, wait for it to disappear
    await page.waitForSelector('button.reactour__close-button', { hidden: true, timeout: 2000 }).catch(() => {});
  }
}
