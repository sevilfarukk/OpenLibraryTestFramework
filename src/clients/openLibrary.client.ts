import { APIRequestContext, expect } from '@playwright/test';

import { OPEN_LIBRARY_ENDPOINTS } from '@src/config/constants';
import { getRuntimeEnv } from '@src/config/env';
import { AuthorResponse, SearchBookParams, SearchResponse } from '@src/types/api.types';

export class OpenLibraryClient {
  private readonly request: APIRequestContext;

  private readonly apiBaseUrl: string;

  public constructor(request: APIRequestContext, apiBaseUrl: string = getRuntimeEnv().apiBaseUrl) {
    this.request = request;
    this.apiBaseUrl = apiBaseUrl;
  }

  public async searchBooks(params: SearchBookParams): Promise<SearchResponse> {
    const response = await this.request.get(`${this.apiBaseUrl}${OPEN_LIBRARY_ENDPOINTS.search}`, {
      params: {
        title: params.title,
        author: params.author
      }
    });

    expect(response.ok(), 'Search API should return successful status').toBeTruthy();

    return (await response.json()) as SearchResponse;
  }

  public async getAuthor(authorKey: string): Promise<AuthorResponse> {
    const response = await this.request.get(
      `${this.apiBaseUrl}${OPEN_LIBRARY_ENDPOINTS.authorByKey(authorKey)}`
    );

    expect(response.ok(), 'Author API should return successful status').toBeTruthy();

    return (await response.json()) as AuthorResponse;
  }
}
