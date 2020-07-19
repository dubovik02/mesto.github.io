/**
 * Карточка места
 */
export default class Card {

  _name = null;
  _link = null;
  _likeCount = 0;

  _placeCard = null;
  _placeCardDeleteIcon = null;
  _placeCardLikeIcon = null;
  _placeCardLikeCount = null;
  _placeCardImage = null;

  _showFunction = null;
  _likeFunction = null;
  _removeFunction = null;

  _cardId = null;
  _ownerId = null;
  _deleteable = false;
  _likeable = true;
  _likes = [];

  /**
   * Конструктор
   * @param {String} name имя места
   * @param {String} link ссылка на изображение
   * @param {boolean} deleteable может быть удалена
   * @param {boolean} likeable может получить лайк
   * @param {Function} showFunction коллбэк вызываемый при клике на изображении или
   * null при отсутсвии (первый параметр коллбека - ссылка на изображение)
   */
  constructor(name, link, deleteable, likeable, showFunction) {
    this._name = name;
    this._link = link;
    this._deleteable = deleteable;
    this._likeable = likeable;
    this._showFunction = showFunction;
  }

  getName() {
    return this._name;
  }

  getLink() {
    return this._link;
  }

  setLikeCount(count) {
    this._likeCount = count;
  }

  getLikeCount() {
    return this._likeCount;
  }

  getCardId() {
    return this._cardId;
  }

  setCardId(id) {
    this._cardId = id;
  }

  setOwnerId(id) {
    this._ownerId = id;
  }

  getOwnerId() {
    return this._ownerId;
  }

  setLikeFunction(likeFunction) {
    this._likeFunction = likeFunction;
  }

  setRemoveFunction(removeFunction) {
    if (removeFunction instanceof Function) {
      this._removeFunction = removeFunction;
    }

  }

  setLikes(likes) {
    this._likes = likes;
  }

  getLikes() {
    return this._likes;
  }

  /**
   * @returns Создает DOM-элемент карточки места
   */
  create() {

    this._placeCard = document.createElement('div');
    this._placeCard.classList.add('place-card');

    this._placeCardImage = document.createElement('div');
    this._placeCardImage.classList.add('place-card__image');
    this._placeCardImage.style.backgroundImage = `url(${this.getLink()})`;

    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description');

    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');
    placeCardName.textContent = this.getName();
    /*----------------------------------------------------------------------------- */
    const placeCardLikeContainer = document.createElement('div');
    placeCardLikeContainer.classList.add('place-card__like-container');

    this._placeCardLikeIcon = document.createElement('button');
    this._placeCardLikeIcon.classList.add('place-card__like-icon');
    if (this._likeable) {
      this._placeCardLikeIcon.classList.add('place-card__like-icon_liked');
    }

    this._placeCardLikeCount = document.createElement('p');
    this._placeCardLikeCount.classList.add('place-card__like-counter');
    this._placeCardLikeCount.textContent = this._likeCount;
    /*----------------------------------------------------------------------------- */
    placeCardLikeContainer.appendChild(this._placeCardLikeIcon);
    placeCardLikeContainer.appendChild(this._placeCardLikeCount);

    this._placeCard.appendChild(this._placeCardImage);
    this._placeCard.appendChild(placeCardDescription);


    /*------------------------------------------------------------------------------*/
    if (this._deleteable) {
      this._placeCardDeleteIcon = document.createElement('button');
      this._placeCardDeleteIcon.classList.add('place-card__delete-icon');
      this._placeCardImage.appendChild(this._placeCardDeleteIcon);
    }
    /*------------------------------------------------------------------------------*/

    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeContainer);

    this._setListeners();

    return this._placeCard;
  }


  /**
   * Инвертирует Like->Dislike / Dislike->Like
   */
  _like = (event/*, cardId, updateFunction*/) => {

    const cardId = this.getCardId();
    const updateFunction = (id) => {
      this.setLikeCount(id);
      this._placeCardLikeCount.textContent = this.getLikeCount();
    };
    const result = event.target.classList.contains('place-card__like-icon_liked');
    this._likeFunction.call(this, cardId, !result, updateFunction);
    event.target.classList.toggle('place-card__like-icon_liked');

  }

  /**
   * Удаляет из DOM карточку текущего места
   */
  _remove = (event) => {
    event.stopPropagation();
    if (confirm('Восстановление карточки будет невозможно. Удалить?')) {

      this._removeFunction.call(this, this.getCardId())
        .then((res) => {
          this._placeCard.remove();
          this._removeListeners();
          return res;
        });
    }
  }

  /**
   * Показывает изображение карточки
   */
  _showImage = () => {

    if (this._showFunction instanceof Function) {
      this._showFunction.call(this, this.getLink());
    }
  }

  /**
   * Устанавливает обработчики Like/Delete/ShowImage
   */
  _setListeners() {
    if (this._placeCardDeleteIcon !== null) {
      this._placeCardDeleteIcon.addEventListener('click', this._remove);
    }

    this._placeCardLikeIcon.addEventListener('click', this._like);


    this._placeCardImage.addEventListener('click', this._showImage);
  }

  /**
   * Удаляет обработчики Like/Delete/ShowImage
   */
  _removeListeners() {
    if (this._placeCardDeleteIcon !== null) {
      this._placeCardDeleteIcon.removeEventListener('click', this._remove);
    }
    this._placeCardLikeIcon.removeEventListener('click', this._like);
    this._placeCardImage.removeEventListener('click', this._showImage);
  }

}
