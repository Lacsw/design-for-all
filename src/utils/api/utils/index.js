export default async function sendRequest(url, options = { method: 'GET' }) {
  return fetch(url, options).then((res) =>
    res.ok ? res.json() : Promise.reject(res.status)
  );
}
