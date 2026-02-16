export const DEFAULT_TIMEOUTS = {
  actionMs: 10_000,
  navigationMs: 20_000,
  assertionMs: 10_000
} as const;

export const OPEN_LIBRARY_ENDPOINTS = {
  search: '/search.json',
  authorByKey: (authorKey: string) => `/authors/${authorKey}.json`
} as const;
