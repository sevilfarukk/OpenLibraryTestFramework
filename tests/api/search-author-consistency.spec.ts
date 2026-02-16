import { test, expect } from '@src/fixtures/api.fixture';

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

test.describe('Open Library cross-endpoint consistency', () => {
  test('should keep author identity consistent between search and author endpoints', async ({
    openLibraryClient
  }) => {
    const searchResponse = await openLibraryClient.searchBooks({
      title: 'Harry Potter',
      author: 'Rowling'
    });

    const doc = searchResponse.docs.find(
      (item) =>
        Array.isArray(item.author_key) &&
        item.author_key.length > 0 &&
        Array.isArray(item.author_name) &&
        item.author_name.length > 0
    );

    expect(doc, 'Expected a search result with author key and author name').toBeDefined();

    const authorKey = doc?.author_key?.[0];
    const searchAuthorName = doc?.author_name?.[0];
    expect(authorKey).toBeDefined();
    expect(searchAuthorName).toBeDefined();

    const author = await openLibraryClient.getAuthor(authorKey as string);

    expect(author.key).toContain(authorKey as string);

    const authorName = author.name ?? author.personal_name;
    expect(authorName, 'Expected author name in author endpoint response').toBeDefined();

    const surname = (searchAuthorName as string).split(/\s+/).pop() ?? '';
    expect(normalizeText(authorName as string)).toContain(normalizeText(surname));
  });
});
