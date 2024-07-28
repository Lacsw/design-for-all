import sendRequest from './utils';

const baseUrl = 'https://design-for-all.net/';

export async function getTree(options) {
  const endpoint = `tree_${options}.json`;
  return sendRequest(baseUrl + endpoint);
}
