// @ts-check
import { apiUrl } from 'utils/config';
import { handleResponse } from './responseHandler';

export class SearchApi {
  /** @type {string} */
  _baseUrl;
  /** @type {HeadersInit} */
  _headers;

  /** @param {{ baseUrl: string; headers: HeadersInit }} options */
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /**
   * Поиск по серверу
   *
   * @param {{ searchText: string; lang: string; pagination?: string }} params
   */
  async serverSearch({ searchText, lang, pagination = '1;20' }) {
    const response = await fetch(
      `${this._baseUrl}/main_fts/${lang}/${pagination}/${encodeURIComponent(
        searchText
      )}`,
      {
        method: 'GET',
        headers: this._headers,
      }
    );
    return handleResponse(response);
  }
}

const searchApi = new SearchApi({
  baseUrl: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default searchApi;
