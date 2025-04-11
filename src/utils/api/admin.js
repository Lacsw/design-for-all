// @ts-check
import { apiUrl } from 'utils/config';
import { handleResponse } from './responseHandler';

export class AdminApi {
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
   * @param {{
   *   login: string;
   *   password: string;
   *   email: string;
   *   name: string;
   *   role: string;
   * }} data
   */
  async createUser(data) {
    const response = await fetch(`${this._baseUrl}/admin_create_user`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  /**
   * @param {string} endPoint
   * @param {{ uuid: string; decision: string; reason?: string }} data
   */
  async sendDecision(endPoint, data) {
    const response = await fetch(`${this._baseUrl}/admin_${endPoint}`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  }

  /**
   * @param {string} endPoint
   * @param {string} pagination
   */
  async getRequests(endPoint, pagination) {
    const response = await fetch(
      `${this._baseUrl}/admin_find_${endPoint}/${pagination}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      }
    );
    return handleResponse(response);
  }

  /**
   * @param {string} endPoint
   * @param {string} uuid
   */
  async getOneRequest(endPoint, uuid) {
    const response = await fetch(
      `${this._baseUrl}/admin_find_${endPoint}/${uuid}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      }
    );
    return handleResponse(response);
  }
}

const adminApi = new AdminApi({
  baseUrl: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default adminApi;
