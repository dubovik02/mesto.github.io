/**
 * Класс настроек взаимодействия с бэкенд частью
 */

export default class Api {

  constructor(serverHttp, cohortCode, userToken) {
    this._serverHttp = serverHttp;
    this._cohortCode = cohortCode;
    this._userToken = userToken;
  }

  /**
   * Загрузка данных автора с сервера
   */
  loadAuthorData() {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/users/me`,
      {
        headers: {
          authorization: `${this._userToken}`
        }
      }));
  }

  /**
   * Загрузка данных карточек с сервера
   */
  loadCards() {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards`,
      {
        headers: {
          authorization: `${this._userToken}`
        }
      }));

  }

  /**
   * Обновляет данные автора
   * @param {string} userName имя пользователя
   * @param {string} userDesc описание пользователя
   */
  updateUserInfo(userName, userDesc) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/users/me`,
      {
        method: 'PATCH',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: userName,
          about: userDesc
        })
      }));
  }

  /**
   * Добавление карточек на сервер
   * @param {string} placeName место
   * @param {string} placeLink ссылка
   */
  addNewCard(placeName, placeLink) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards`,
      {
        method: 'POST',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          name: placeName,
          link: placeLink
        })
      }));
  }

  /**
   * Удаляет карточку с сервера
   * @param {string} cardId идентификатор карточки
   */
  deleteCard(cardId) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards/${cardId}`,
      {
        method: 'DELETE',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        }
      }));

  }

  /**
   * Like карточки
   * @param {string} cardId id карточки
   */
  likeCard(cardId) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards/like/${cardId}`,
      {
        method: 'PUT',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        }
      }));
  }

  /**
  * Dislike карточки
  * @param {string} cardId id карточки
  */

  dislikeCard(cardId) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/cards/like/${cardId}`,
      {
        method: 'DELETE',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        }
      }));

  }

  /**
   * Обновляет аватар
   * @param {string} newAvatarlink ссылка на аватар
   */
  updateAvatar(newAvatarlink) {

    return this.parseResponse(fetch(`${this._serverHttp}/${this._cohortCode}/users/me/avatar`,
      {
        method: 'PATCH',

        headers: {
          authorization: `${this._userToken}`,
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          avatar: newAvatarlink
        })
      }));
  }


  /**
   * Разбор ответа сервера
   * @param {Promise} resPromise первичный ответ
   * @returns {Promise} ошибка или ответ в формате json
   */
  parseResponse(resPromise) {

    return resPromise
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status)
        }
        else {
          return res.json();
        }
      });
  }

}
