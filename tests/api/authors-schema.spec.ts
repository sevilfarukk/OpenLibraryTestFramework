import { test, expect } from '@src/fixtures/api.fixture';

test.describe('Open Library author schema resilience', () => {
  const authorKeys = ['OL23919A', 'OL26320A'];

  for (const authorKey of authorKeys) {
    test(`should validate author payload schema for ${authorKey}`, async ({
      openLibraryClient
    }) => {
      const author = await openLibraryClient.getAuthor(authorKey);

      expect(typeof author.key).toBe('string');
      expect(author.key).toContain('/authors/');

      const displayName = author.name ?? author.personal_name;
      expect(displayName, 'Author should expose name or personal_name').toBeDefined();
      expect(typeof displayName).toBe('string');

      if (author.website !== undefined) {
        expect(
          typeof author.website === 'string' ||
            (Array.isArray(author.website) &&
              author.website.every((site) => typeof site === 'string'))
        ).toBeTruthy();
      }

      if (author.links !== undefined) {
        expect(Array.isArray(author.links)).toBeTruthy();
        for (const link of author.links) {
          if (link.url !== undefined) {
            expect(typeof link.url).toBe('string');
          }
          if (link.title !== undefined) {
            expect(typeof link.title).toBe('string');
          }
        }
      }
    });
  }
});
