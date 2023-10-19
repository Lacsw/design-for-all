class AuthorApi {
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

	async getArticles({ pagination, status }) {
		const queryParams = {
			pagination: `[1,${pagination}]`,
			status: status || '',
		};

		const queryString = Object.entries(queryParams)
			.filter(([key, value]) => value !== undefined && value !== '')
			.map(([key, value]) => `${key}=${value}`)
			.join('&');

		const response = await fetch(
			`${this._baseUrl}/user_find_updates_p?${queryString}`,
			{
				method: 'GET',
				headers: this._headers,
				credentials: 'include',
			}
		);
		return this._checkResponse(response);
	}

	async getArticleById({ lang, articleId }) {
		const queryParams = {
			lang,
			uuid: articleId,
		};

		const queryString = Object.entries(queryParams)
			.filter(([key, value]) => value !== undefined && value !== '')
			.map(([key, value]) => `${key}=${value}`)
			.join('&');

		const response = await fetch(
			`${this._baseUrl}/get_publication_p?${queryString}`,
			{
				method: 'GET',
				headers: this._headers,
				credentials: 'include',
			}
		);
		return this._checkResponse(response);
	}

	async profileAuthor() {
		const response = await fetch(`https://design-for-all.net/profile`, {
			method: 'GET',
			headers: this._headers,
			credentials: 'include',
		});

		return this._checkResponse(response);
	}
}

const authorApi = new AuthorApi({
	baseUrl: 'https://design-for-all.net/api/v1',
	headers: {
		'Content-Type': 'application/json',
	},
});

export default authorApi;
