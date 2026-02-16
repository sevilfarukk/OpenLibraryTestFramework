import { expect, test as base } from '@playwright/test';

import { AuthorPage } from '@src/pages/author.page';
import { HomePage } from '@src/pages/home.page';
import { SearchResultsPage } from '@src/pages/searchResults.page';

type AuthorSearchParams = {
  title: string;
  author: string;
  authorDisplayName: string;
};

type UiFixtures = {
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  authorPage: AuthorPage;
  openAuthorFromAdvancedSearch: (params: AuthorSearchParams) => Promise<void>;
};

export const test = base.extend<UiFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  authorPage: async ({ page }, use) => {
    await use(new AuthorPage(page));
  },
  openAuthorFromAdvancedSearch: async ({ homePage, searchResultsPage, page }, use) => {
    await use(async ({ title, author, authorDisplayName }: AuthorSearchParams) => {
      await homePage.advancedSearchByTitleAndAuthor(title, author);
      await searchResultsPage.openAuthorFromFirstResult(authorDisplayName);
      await expect(page).toHaveURL(/\/authors\//);
    });
  }
});

export { expect };
