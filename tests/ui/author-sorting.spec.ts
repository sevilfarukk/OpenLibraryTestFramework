import { test, expect } from '@src/fixtures/ui.fixture';

test.describe('Open Library author rating flow UI', () => {
  test('should validate Rowling top-rated work from advanced search', async ({
    openAuthorFromAdvancedSearch,
    authorPage
  }) => {
    // Public-site sorting/navigation can be slow; keep timeout local to this heavy E2E path.
    test.setTimeout(90_000);

    await openAuthorFromAdvancedSearch({
      title: 'Harry Potter',
      author: 'Rowling',
      authorDisplayName: 'J. K. Rowling'
    });

    await authorPage.sortWorksByRating();

    const topRatedWork = await authorPage.getTopRatedDisplayedWorkTitle();
    expect(topRatedWork).toBe('Harry Potter and the Half-Blood Prince');
  });
});
