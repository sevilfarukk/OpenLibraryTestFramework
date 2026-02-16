import { expect, Page } from '@playwright/test';

export class SearchResultsPage {
  private readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async openAuthorFromFirstResult(expectedAuthorName: string): Promise<void> {
    const firstResult = this.page.locator('li.searchResultItem').first();
    await expect(firstResult, 'Expected at least one search result').toBeVisible();

    const firstAuthorLink = firstResult
      .locator('a[href^="/authors/"]')
      .filter({ hasText: expectedAuthorName })
      .first();

    await expect(
      firstAuthorLink,
      `Expected first result author to include ${expectedAuthorName}`
    ).toBeVisible();
    await firstAuthorLink.click();
  }

  public async getResultCount(): Promise<number> {
    return this.page.locator('li.searchResultItem').count();
  }

  public async openFirstWorkFromResults(): Promise<void> {
    const firstResult = this.page.locator('li.searchResultItem').first();
    await expect(firstResult, 'Expected at least one search result').toBeVisible();

    const firstWorkLink = firstResult.locator('a.results[href^="/works/"]').first();
    await expect(firstWorkLink, 'Expected first result to contain a work link').toBeVisible();
    await firstWorkLink.click();
  }
}
