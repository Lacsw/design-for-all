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

	async loginAuthor(
		data = {
			login: 'test_account',
			password: '00xMgxOASRdsz0RZ',
		}
	) {
		const response = await fetch(`${this._baseUrl}/login`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(data),
			credentials: 'include',
		});

		return this._checkResponse(response);
	}
}

const authApi = new AuthApi({
	baseUrl: 'https://design-for-all.net/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default authApi;
