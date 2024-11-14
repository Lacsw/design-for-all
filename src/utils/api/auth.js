class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  async mainPage() {
    const response = await fetch(`https://design-for-all.net/`, {
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
    });
    return response.ok ? Promise.resolve() : Promise.reject('Выход не удался.');
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://design-for-all.net/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authApi;
