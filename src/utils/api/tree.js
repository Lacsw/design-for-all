const baseUrl = 'https://design-for-all.net/';

export async function getTree(options) {
  const endpoint = `tree_${options}.json`;
  return sendRequest(baseUrl + endpoint);
}

async function sendRequest(url) {
  return fetch(url)
    .then(res => res.ok ?
      res.json() :
      Promise.reject(res.status));
}