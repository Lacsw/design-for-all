// @ts-check

export class AuthorApi {
  /** @type {string} */
  _baseUrl = '';
  /** @type {HeadersInit} */
  _headers = {};

  /** @param {{ baseUrl: string; headers: HeadersInit }} options */
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  /** @param {Response} res */
  _checkResponse(res) {
    if (res.ok) {
      return res.status !== 200 ? res.statusText : res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  }

  async getArticles({ pagination, status, page = 1 }) {
    let path = `user_find_updates/${status}/${page};${pagination}`;
    if (status === 'drafted') path = `user_find_drafts_p/${page};${pagination}`;
    const response = await fetch(`${this._baseUrl}/${path}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });
    return this._checkResponse(response);
  }

  async searchByTitles({ status, pagination, text }) {
    const response = await fetch(
      `${this._baseUrl}/user_updates_fts_p/${status}/1;${pagination}/${text}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      }
    );
    return this._checkResponse(response);
  }

  async checkRecommend(lang, id) {
    const response = await fetch(
      `${this._baseUrl}/check_recommend/${lang}/${id}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      }
    );
    return this._checkResponse(response);
  }

  async getRecommends(lang, ids) {
    const response = await fetch(
      `${this._baseUrl}/user_get_recomm_by_uuids/${lang}/${ids};`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: 'include',
      }
    );
    return this._checkResponse(response);
  }

  async addCreation(type, data) {
    const response = await fetch(`${this._baseUrl}/user_${type}_p`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify(data),
    });
    return this._checkResponse(response);
  }

  async deleteDraft(uuid) {
    const response = await fetch(`${this._baseUrl}/user_delete_draft_p`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ uuid }),
    });
    return this._checkResponse(response);
  }

  async getCreation(type, id) {
    const response = await fetch(`${this._baseUrl}/user_find_${type}_p/${id}`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
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

  /**
   * @param {File} file
   * @returns {Promise}
   */
  async uploadImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = (e) => {
        reject(new Error(`Error on reading binary file: ${e.type}`));
      };

      reader.onload = (onloadEvt) => {
        /** @type {string} */
        // @ts-ignore
        let result = onloadEvt.target.result;

        const indexOfStart = result.indexOf('base64');
        // cut off the metadata indicating that the data is encoded in base-64
        result = result.slice(indexOfStart + 7);

        fetch(`${this._baseUrl}/user_upload_image_p`, {
          method: 'POST',
          headers: this._headers,
          body: result,
          credentials: 'include',
        })
          .then(this._checkResponse)
          .then(resolve)
          .catch((err) =>
            reject(
              new Error(`Error on POST user_upload_image_p: ${{ error: err }}`)
            )
          );
      };

      // encode to base-64
      reader.readAsDataURL(file);
    });
  }
}

const authorApi = new AuthorApi({
  baseUrl: 'https://design-for-all.net/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default authorApi;
