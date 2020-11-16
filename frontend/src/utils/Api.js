class Api {
  constructor(options) {
    this._options = options;
  }

  // Запрос к серверу - по умолчанию GET
  _serverRequest(urlSuffix, method = 'GET', body = undefined) {
    return fetch(this._options.baseUrl + urlSuffix, {
      method: method,
      headers: {
        authorization: this._options.headers.authorization,
        'Content-Type': this._options.headers['Content-Type']
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

  // Профиль пользователя
  getUserInfo() {
    return this._serverRequest('users/me');
  }

  saveProfile(profile) {
    return this._serverRequest('users/me', 'PATCH', profile);
  }

  saveAvatar(avatar) {
    return this._serverRequest('users/me/avatar', 'PATCH', avatar);
  }

  // Инициализация карточек
  getInitialCards() {
    return this._serverRequest('cards');
  }

  saveCard(card) {
    return this._serverRequest('cards', 'POST', card);
  }

  deleteCard(cardId) {
    return this._serverRequest('cards/' + cardId, 'DELETE');
  }

  // Лайки
  like(cardId, likeOn = true) {
    const metod = likeOn ? 'PUT' : 'DELETE';
    return this._serverRequest('cards/likes/' + cardId, metod);
  }

}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14/',
  headers: {
    authorization: '44e5d6af-1500-4757-9283-b4dfbe9e13fc',
    'Content-Type': 'application/json'
  }
});

export {api}