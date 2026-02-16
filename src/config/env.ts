import dotenv from 'dotenv';

dotenv.config();

export interface RuntimeEnv {
  uiBaseUrl: string;
  apiBaseUrl: string;
}

const DEFAULT_UI_BASE_URL = 'https://openlibrary.org';
const DEFAULT_API_BASE_URL = 'https://openlibrary.org';

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/$/, '');
}

export function getRuntimeEnv(): RuntimeEnv {
  return {
    uiBaseUrl: normalizeBaseUrl(process.env.UI_BASE_URL ?? DEFAULT_UI_BASE_URL),
    apiBaseUrl: normalizeBaseUrl(process.env.API_BASE_URL ?? DEFAULT_API_BASE_URL)
  };
}
