export default async function sendRequest(url, options = { method: 'GET' }) {
  return fetch(url, options).then((res) =>
    res.ok ? res.json() : Promise.reject(res.status)
  );
}

export async function checkResponse(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    return Promise.reject(`Error ${{ data }}`);
  }
}
