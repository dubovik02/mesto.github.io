'use strict'
/**
 * Класс автора
 */
class UserInfo {

  _name = null;
  _description = null;
  _avatarUrl = null;
  _nameElement = null;
  _descriptionElement = null;
  _avatarElement = null;
  _userId = null;

  /**
   * Конструктор
   * @param {Element} nameElem DOM-элемент отображающий имя на странице
   * @param {Element} descElem DOM-элемент отображающий описание на странице
   * @param {Element} avatarElement DOM-элемент аватара
   */
  constructor(nameElem, descElem, avatarElement) {
    this._nameElement = nameElem;
    this._descriptionElement = descElem;
    this._avatarElement = avatarElement;
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  setAvatarUrl(avatarUrl) {
    this._avatarUrl = avatarUrl;
  }

  getAvatarUrl() {
    return this._avatarUrl;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }

  /**
   * Устанавливавет реквизиты автора
   * @param {string} name имя
   * @param {string} description описание
   * @param {string} avatarURL ссылка на аватар или null при ее отсутствии
   */
  setUserInfo(name, description, avatarURL) {
    this._name = name;
    this._description = description;
    if (avatarURL !== null) {
      this.setAvatarUrl(avatarURL);
    }

  }

  /**
   * Обновляет данные автора в DOM-элементах
   */
  updateUserInfo() {
    this._nameElement.textContent = this._name;
    this._descriptionElement.textContent = this._description;
    this._avatarElement.style.backgroundImage = `url(${this._avatarUrl})`;
  }

}

// Для таких классов удобно использовать геттеры: https://yadi.sk/i/RgGlodMrciyvSg