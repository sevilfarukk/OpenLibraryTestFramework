import { expect, Page } from '@playwright/test';

export class AuthorPage {
  private readonly page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async sortWorksByRating(): Promise<void> {
    await this.sortWorksBy('rating', 'Top Rated');
  }

  public async sortWorksByTrending(): Promise<void> {
    await this.sortWorksBy('trending', 'Trending');
  }

  public async openResultsPage(pageNumber: number): Promise<void> {
    const pageLink = this.page.locator(`a.ChoosePage[href*="page=${pageNumber}"]`).first();
    await expect(pageLink, `Page link ${pageNumber} should be visible`).toBeVisible();
    await pageLink.click();
    await expect(this.page).toHaveURL(new RegExp(`[?&]page=${pageNumber}(&|$)`));
  }

  public async enableOnlyEbooks(): Promise<void> {
    const onlyEbooksLink = this.page.locator('a[href*="mode=ebooks"]').first();
    await expect(onlyEbooksLink, '"only ebooks" filter should be visible').toBeVisible();
    await onlyEbooksLink.click();
    await expect(this.page).toHaveURL(/mode=ebooks/);
  }

  public async getDisplayedWorkCount(): Promise<number> {
    return this.page.locator('li.searchResultItem').count();
  }

  public async assertEbookIndicatorVisibleInFirstResult(): Promise<void> {
    const firstResult = this.page.locator('li.searchResultItem').first();
    await expect(firstResult, 'Expected at least one filtered ebook result').toBeVisible();

    const ebookCta = firstResult
      .locator('a.cta-btn')
      .filter({ hasText: /Preview|Borrow|Read/i })
      .first();
    await expect(
      ebookCta,
      'Expected ebook CTA (Preview/Borrow/Read) in first filtered result'
    ).toBeVisible();
  }

  public async getTopRatedDisplayedWorkTitle(): Promise<string> {
    const topWorkLink = this.page.locator('li.searchResultItem a.results').first();
    await expect(topWorkLink, 'Expected at least one work after sorting').toBeVisible();

    const title = await topWorkLink.textContent();
    return title?.trim() ?? '';
  }

  private async sortWorksBy(sortValue: string, optionLabel: string): Promise<void> {
    const sortDropper = this.page.locator('details.sort-dropper').first();
    await expect(sortDropper, 'Sort control should be visible on author page').toBeVisible();
    await sortDropper.locator('summary').click();

    const sortOption = this.page
      .locator(`details.sort-dropper a[href*="sort=${sortValue}"]`)
      .first();
    await expect(sortOption, `${optionLabel} option should be visible`).toBeVisible();
    await sortOption.click();

    await expect(this.page).toHaveURL(new RegExp(`[?&]sort=${sortValue}(&|$)`));
  }
}
