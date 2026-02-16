import { authorValidationCases } from '@src/data/authors.data';
import { test, expect } from '@src/fixtures/api.fixture';
import { AuthorResponse } from '@src/types/api.types';
import { assertArrayNotEmpty, assertDefined } from '@src/utils/schema';

function normalizeUrl(url: string): string {
  return url.trim().replace(/\/$/, '');
}

function extractAuthorWebsite(author: AuthorResponse): string | undefined {
  if (typeof author.website === 'string') {
    return author.website;
  }

  if (Array.isArray(author.website) && author.website.length > 0) {
    return author.website[0];
  }

  return author.links?.find((link) => Boolean(link.url))?.url;
}

test.describe('Open Library author validation API', () => {
  for (const authorCase of authorValidationCases) {
    test(`should validate author website for ${authorCase.authorQuery}`, async ({
      openLibraryClient
    }) => {
      const searchResponse = await openLibraryClient.searchBooks({
        title: authorCase.titleQuery,
        author: authorCase.authorQuery
      });

      expect(searchResponse.numFound).toBeGreaterThan(0);

      const firstResult = assertDefined(searchResponse.docs[0], 'search.docs[0]');
      const authorKeys = assertArrayNotEmpty(firstResult.author_key, 'search.docs[0].author_key');
      const authorKey = authorCase.expectedAuthorKey ?? authorKeys[0];
      const resolvedAuthorKey = assertDefined(authorKey, 'author key');

      const authorDetails = await openLibraryClient.getAuthor(resolvedAuthorKey);

      if (authorCase.expectedDisplayName) {
        expect(
          [authorDetails.name, authorDetails.personal_name],
          'Author name should match expected display name'
        ).toContain(authorCase.expectedDisplayName);
      }

      const resolvedWebsite = extractAuthorWebsite(authorDetails);
      expect(resolvedWebsite, 'Author website should be present in author details').toBeDefined();
      expect(normalizeUrl(assertDefined(resolvedWebsite, 'author website'))).toBe(
        normalizeUrl(authorCase.expectedWebsite)
      );
    });
  }
});
