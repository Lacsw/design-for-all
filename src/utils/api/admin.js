const baseUrl = 'https://design-for-all.net/api/v1';
const headers = {
  'Content-Type': 'application/json',
};

export async function createUser(data) {
  const options = {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(baseUrl + '/admin_create_user', options).then((res) => {
    if (res.ok) {
      return res.status !== 200 ? res.statusText : res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  });
}
