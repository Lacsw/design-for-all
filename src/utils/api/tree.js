import sendRequest from './utils';

const baseUrl = 'https://design-for-all.net/';

export async function getTree(options) {
  const endpoint = `tree_${options}.json`;
  return sendRequest(baseUrl + endpoint);
}

export async function getTitles() {
  const endpoint = `main_categories.json`;
  return sendRequest(baseUrl + endpoint);
}
