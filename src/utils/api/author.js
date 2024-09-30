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
    let path = `user_find_updates/${status}/1;${pagination}`;
    if (status === 'drafted') path = 'user_find_drafts_p/1;' + pagination;
    const response = await fetch(`${this._baseUrl}/${path}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });
    return this._checkResponse(response);
  }

  async createDraft(draft) {
    const response = await fetch(`${this._baseUrl}/user_create_draft_p`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(draft),
    });
    return this._checkResponse(response);
  }

  async getArticleById({ lang, articleId }) {
    const response = await fetch(
      `${this._baseUrl}/get_publication/${lang}/${articleId}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      }
    );

    return this._checkResponse(response);
  }

  async getUpdates(page) {
    const response = await fetch(`${this._baseUrl}/get_updates/${page};20`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });

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
