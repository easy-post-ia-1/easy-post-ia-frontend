export const configEnv: Record<string, string> = {
  VITE_API_URL: import.meta.env.VITE_API_URL ?? '',
  VITE_FACEBOOK_APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID ?? '',
  VITE_FACEBOOK_CLIENT_TOKEN: import.meta.env.VITE_FACEBOOK_CLIENT_TOKEN ?? '',
  VITE_GOOGLE_WEB_CLIENT_ID: import.meta.env.VITE_GOOGLE_WEB_CLIENT_ID ?? '',
};
