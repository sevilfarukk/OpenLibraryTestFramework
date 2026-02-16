import { AuthorValidationCase } from '@src/types/api.types';

export const authorValidationCases: AuthorValidationCase[] = [
  {
    authorQuery: 'Rowling',
    titleQuery: 'Harry Potter',
    expectedWebsite: 'http://www.jkrowling.com/',
    expectedDisplayName: 'J. K. Rowling'
  }
];
