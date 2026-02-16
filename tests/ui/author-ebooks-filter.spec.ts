import { test, expect } from '@src/fixtures/ui.fixture';

test.describe('Open Library author ebooks filter', () => {
  test('should apply only ebooks filter on author page', async ({
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

    await authorPage.enableOnlyEbooks();

    await expect(page).toHaveURL(/mode=ebooks/);
    await authorPage.assertEbookIndicatorVisibleInFirstResult();
  });
});
