import sendRequest from './utils';

const baseUrl = 'https://design-for-all.net/';


export async function serverSearch({ searchText, lang, pagination = '1;20' }) {
  const endpoint = `api/v1/main_fts/${lang}/${pagination}/${encodeURIComponent(searchText)}`;
  return sendRequest(baseUrl + endpoint);
}