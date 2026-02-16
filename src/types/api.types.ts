export interface SearchBookParams {
  title: string;
  author: string;
}

export interface SearchDocument {
  key?: string;
  title?: string;
  author_name?: string[];
  author_key?: string[];
}

export interface SearchResponse {
  numFound: number;
  start: number;
  docs: SearchDocument[];
}

export interface AuthorResponse {
  key: string;
  name?: string;
  personal_name?: string;
  website?: string | string[];
  links?: Array<{
    title?: string;
    url?: string;
  }>;
}

export interface AuthorValidationCase {
  authorQuery: string;
  titleQuery: string;
  expectedWebsite: string;
  expectedDisplayName?: string;
  expectedAuthorKey?: string;
}
