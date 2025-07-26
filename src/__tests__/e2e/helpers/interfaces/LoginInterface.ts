import { Page } from 'puppeteer';

export interface LoginCredentials {
    username: string;
    password: string;
    email?: string;
}

/**
   * Logs in a user via the login form using Puppeteer.
   * Navigates to /login, fills in username and password, and submits the form.
   * Waits for navigation and asserts the URL is /home or /.
   * Throws an error if login fails.
   */
export interface LoginUserOptions {
    page: Page;
    baseUrl: string;
    credentials: LoginCredentials;
}