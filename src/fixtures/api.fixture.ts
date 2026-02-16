import { test as base } from '@playwright/test';

import { OpenLibraryClient } from '@src/clients/openLibrary.client';

type ApiFixtures = {
  openLibraryClient: OpenLibraryClient;
};

export const test = base.extend<ApiFixtures>({
  openLibraryClient: async ({ request }, use) => {
    const client = new OpenLibraryClient(request);
    await use(client);
  }
});

export { expect } from '@playwright/test';
