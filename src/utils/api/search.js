import sendRequest from './utils';

import { apiUrl } from 'utils/config';

export async function serverSearch({ searchText, lang, pagination = '1;20' }) {
  const endpoint = `${apiUrl}/main_fts/${lang}/${pagination}/${encodeURIComponent(
    searchText
  )}`;
  return sendRequest(endpoint);
}
