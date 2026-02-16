import { test, expect } from '@src/fixtures/ui.fixture';

test.describe('Open Library author sorting persistence', () => {
  test('should keep Trending sort active when navigating to page 2', async ({
    openAuthorFromAdvancedSearch,
    authorPage,
    page
  }) => {
    test.setTimeout(90_000);

    await openAuthorFromAdvancedSearch({
      title: 'Harry Potter',
      author: 'Rowling',
      authorDisplayName: 'J. K. Rowling'
    });

    await authorPage.sortWorksByTrending();
    await authorPage.openResultsPage(2);

    await expect(page).toHaveURL(/sort=trending/);
    await expect(page.locator('details.sort-dropper .sort-selected')).toContainText('Trending');
  });
});
