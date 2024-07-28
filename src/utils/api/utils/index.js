export default async function sendRequest(url) {
  return fetch(url)
    .then(res => res.ok ?
      res.json() :
      Promise.reject(res.status));
}