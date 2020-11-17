const BASE_URL = 'http://localhost:3000'; //'https://auth.nomoreparties.co';

const serverRequest = (urlSuffix, method = 'GET', body = undefined, authorization = undefined) => {
  return fetch(BASE_URL + urlSuffix, {
    method: method,
    headers: {
      'authorization': authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(`Ошибка: ${response.status}`);
    });
}

export const signUp = (email, password) =>
  serverRequest('/signup', 'POST', { password, email });

export const signIn = (email, password) =>
  serverRequest('/signin', 'POST', { password, email });

export const getUser = (token) =>
  serverRequest('/users/me', 'GET', undefined, `Bearer ${token}`);
