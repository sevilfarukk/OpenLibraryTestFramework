import { Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded', timeout: 45_000 });
  }

  public async advancedSearchByTitleAndAuthor(title: string, author: string): Promise<void> {
    await this.page.goto('/advancedsearch', { waitUntil: 'domcontentloaded', timeout: 45_000 });

    const titleInput = this.page.locator('input[name="title"]');
    const authorInput = this.page.locator('input[name="author"]');
    const searchButton = this.page.locator('button[type="submit"].cta-btn--search');

    await titleInput.fill(title);
    await authorInput.fill(author);
    await Promise.all([
      this.page.waitForURL(/\/search\?/, { timeout: 45_000 }),
      searchButton.click({ noWaitAfter: true })
    ]);
  }

  public async searchFromHeader(query: string): Promise<void> {
    const searchInput = this.page.locator('form.search-bar-input input[name="q"]').first();
    const submitButton = this.page.locator('form.search-bar-input input.search-bar-submit').first();

    await searchInput.fill(query);
    await submitButton.click();
  }
}
