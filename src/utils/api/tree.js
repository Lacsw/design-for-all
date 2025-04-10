// @ts-check
import { domain } from 'utils/config';
import { handleResponse } from './responseHandler';

export class TreeApi {
  /** @type {string} */
  _baseUrl;
  /** @type {HeadersInit} */
  _headers;

  /** @param {{ baseUrl: string; headers: HeadersInit }} options */
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /** @param {string} options */
  async getTree(options) {
    const response = await fetch(`${this._baseUrl}/tree_${options}.json`, {
      method: 'GET',
      headers: this._headers,
    });
    return handleResponse(response);
  }

  /** Получает список заголовков категорий */
  async getTitles() {
    const response = await fetch(`${this._baseUrl}/main_categories.json`, {
      method: 'GET',
      headers: this._headers,
    });
    return handleResponse(response);
  }
}

const treeApi = new TreeApi({
  baseUrl: domain,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default treeApi;
