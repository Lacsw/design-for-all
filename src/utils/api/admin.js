import { apiUrl } from 'utils/config';

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
  return fetch(apiUrl + '/admin_create_user', options).then((res) => {
    if (res.ok) {
      return res.status !== 200 ? res.statusText : res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  });
}

export async function sendDecision(endPoint, data) {
  const options = {
    method: 'POST',
    headers,
    credentials: 'include',
    body: JSON.stringify(data),
  };
  return fetch(apiUrl + '/admin_' + endPoint, options).then((res) => {
    if (res.ok) {
      return res.status !== 200 ? res.statusText : res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  });
}

export async function getRequests(endPoint, pagination) {
  const options = {
    method: 'GET',
    headers,
    credentials: 'include',
  };
  return fetch(
    apiUrl + '/admin_find_' + endPoint + '/' + pagination,
    options
  ).then((res) => {
    if (res.ok) {
      return res.status !== 200 ? res.statusText : res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  });
}


export async function getOneRequest(endPoint, uuid) {
  const options = {
    method: 'GET',
    headers,
    credentials: 'include',
  };
  return fetch(
    apiUrl + '/admin_find_' + endPoint + '/' + uuid,
    options
  ).then((res) => {
    if (res.ok) {
      return res.status !== 200 ? res.statusText : res.json();
    } else {
      return Promise.reject(`Ошибка ${res.status}`);
    }
  });
}