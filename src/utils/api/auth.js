import { apiUrl, domain } from 'utils/config';

class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.status !== 200 ? res.statusText : res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  async mainPage() {
    const response = await fetch(`${domain}/`, {
      method: 'GET',
      headers: this._headers,
    });
    return this._checkResponse(response);
  }

  // login: 'test_account',
  // password: '00xMgxOASRdsz0RZ'

  // login: super_admin,
  // password: IgEWMWuh33L5LpOK

  async loginAuthor(data) {
    const response = await fetch(`${this._baseUrl}/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    return this._checkResponse(response);
  }

  async logout() {
    const response = await fetch(`${this._baseUrl}/logout`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
    });
    return this._checkResponse(response);
  }

  async regUser(data) {
    const response = await fetch(`${this._baseUrl}/author_create`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.ok) return response.statusText;
    const message = await response.json();
    return Promise.reject(message);
  }

  async updateUser(data) {
    const response = await fetch(`${this._baseUrl}/user_update`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
    return response.ok ? Promise.resolve() : Promise.reject('Выход не удался.');
  }

  async getCaptcha(theme) {
    return fetch(`${apiUrl}/get_captcha/${theme}`).then(
      (res) => res.blob()
    );
  }
}

const authApi = new AuthApi({
  baseUrl: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
