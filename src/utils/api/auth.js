// @ts-check
import { apiUrl, domain } from 'utils/config';
import { handleResponse } from './responseHandler';

class AuthApi {
  /** @type {string} */
  _baseUrl;
  /** @type {HeadersInit} */
  _headers;

  /** @param {{ baseUrl: string; headers: HeadersInit }} options */
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async mainPage() {
    const response = await fetch(`${domain}/`, {
      method: 'GET',
      headers: this._headers,
    });
    return handleResponse(response);
  }

  /** @param {{ login: string; password: string }} data */
  async loginAuthor(data) {
    const response = await fetch(`${this._baseUrl}/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    return handleResponse(response);
  }

  async logout() {
    const response = await fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    });
    return handleResponse(response);
  }

  /**
   * @param {{
   *   login: string;
   *   password: string;
   *   email: string;
   *   name: string;
   * }} data
   */
  async regUser(data) {
    const response = await fetch(`${this._baseUrl}/author_create`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    return handleResponse(response);
  }

  /**
   * @param {{
   *   uuid: string;
   *   name?: string;
   *   email?: string;
   *   password?: string;
   * }} data
   */
  async updateUser(data) {
    const response = await fetch(`${this._baseUrl}/user_update`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return handleResponse(response);
  }

  /** @param {string} theme */
  async getCaptcha(theme) {
    const response = await fetch(`${apiUrl}/get_captcha/${theme}`);
    return handleResponse(response);
  }
}

const authApi = new AuthApi({
  baseUrl: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
