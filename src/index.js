import "./style.css";
import Api from './js/backend/Api';
import CardsList from './js/cards/CardsList';
import Card from './js/cards/Card';
import UserInfo from './js/entities/UserInfo';
import FormInputsValidator from './js/validators/FormInputsValidator';
import PopupAddPlace from './js/popoups/PopupAddPlace';
import PopupEditAuthor from './js/popoups/PopupEditAuthor';
import PopupEditAvatar from './js/popoups/PopupEditAvatar';
import PopupImage from './js/popoups/PopupImage';

/* --------------------Переменные-------------*/
const serverHttp = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk';
const api = new Api(serverHttp, 'cohort11', 'cb11cba6-5a41-43f3-af6f-8fd4083a7282');
//const api = new Api('https://praktikum.tk', 'cohort11', 'cb11cba6-5a41-43f3-af6f-8fd4083a7282');

/* ---------Место-----------*/
const placesList = document.querySelector('.places-list');

const newPlaceWindow = document.querySelector('.popup');
const addPlaceButton = document.querySelector('.user-info__button');
const closePlaceWindowButton = document.querySelector('.popup-add__close');
const submitPlaceButton = document.querySelector('.popup__button');
const addPlaceForm = document.forms.new;

const newPlaceName = document.forms.new.elements.name;
const newPlaceLink = document.forms.new.elements.link;
const cardsList = new CardsList(placesList);

/* ---------Автор----------*/
const editAuthorWindow = document.querySelector('.popup-edit');
const editAuthorInfoButton = document.querySelector('.user-info__button-edit');
const editAuthorCloseButton = document.querySelector('.popup-edit__close');
const submitAuthorEditButton = document.querySelector('.popup-edit__button-save');
const editAuthorForm = document.forms.edit;

const authorAvatarElement = document.querySelector('.user-info__photo');
const authorNameElement = document.querySelector('.user-info__name');
const authorDescriptionElement = document.querySelector('.user-info__job');

const avatarEditWindow = document.querySelector('.popup-avatar-edit');
const authorAvatarForm = document.forms.avataredit;
const submitAvatarEditButton = document.querySelector('.popup-edit__button-save-avatar');
const editAvatarCloseButton = document.querySelector('.popup-avatar-edit__close');
// текущий автор
const currentAuthor = new UserInfo(authorNameElement, authorDescriptionElement, authorAvatarElement);

/* --------Изображение------- */
const placeWindow = document.querySelector('.popup-image');
const butPlaceWindowClose = document.querySelector('.popup-image__close');

/*---------Попапы------------*/
const popupAdd = new PopupAddPlace(newPlaceWindow, addPlaceButton, closePlaceWindowButton, submitPlaceButton);
const popupAuthor = new PopupEditAuthor(editAuthorWindow, editAuthorInfoButton, editAuthorCloseButton, submitAuthorEditButton, currentAuthor);
const popupAvatar = new PopupEditAvatar(avatarEditWindow, authorAvatarElement, editAvatarCloseButton, submitAvatarEditButton);
const popupImage = new PopupImage(placeWindow, null, butPlaceWindowClose);

/* --------------------Функции---------------------------------------------------------------*/

/**
 * Настройка всех попапов
 */
function initPopups() {
  initPopup(popupAdd, { form: addPlaceForm, submitFunction: addPlace });
  initPopup(popupAuthor, { form: editAuthorForm, submitFunction: updateUserInfo });
  initPopup(popupAvatar, { form: authorAvatarForm, submitFunction: updateAvatar });

}

/**
 * Настройка одного попапа
 */
function initPopup(popup, objProp) {
  popup.setForm(objProp.form);
  const msgObj = { SizeErrMessage: 'Должно быть от 2 до 30 символов', MissingErrMessage: 'Это обязательное поле', LinkErrMessage: 'Здесь должна быть ссылка' };
  popup.setFormValidator(new FormInputsValidator(popup.getForm(), msgObj));
  popup.setSubmitFunction(objProp.submitFunction);
}

/**
 * Базовая функция при загрузки страницы
 */
function makeDOM() {
  makePlacesList();
  makeAuthor();
  initPopups();
}

/* --------------------Работа с карточками----------*/

/**
 * Формирование содержимого контейнера с карточками
 */
function makePlacesList() {

  // вспомогательная функция отрисовки
  // загрузка данных с сервера
  api.loadCards()
    .then(loadCardsData)
    .catch((err) => {
      console.log(`Ошибка загрузки данных карточек: ${err}`);
    });

}

/**
 * Загрузка данных в контейнер карточек из массива
 * @param {Array} cardsDataArr массив данных карточек
 */
function loadCardsData(cardsDataArr) {

  const cardDOMArr = [];
  cardsDataArr.forEach((item) => {
    cardDOMArr.push(createCard(item).create());
  });
  cardsList.render(cardDOMArr);
}

/**
 * Cоздание и настройка карточки из объекта свойств
 * @param {Object} objProp - объект свойств карточки
 */
function createCard(objProp) {
  const card = new Card(objProp.name, objProp.link, isDeleteable(objProp.owner._id), isLikeable(objProp.likes), showImage);
  card.setCardId(objProp._id)
  card.setOwnerId(objProp.owner._id);
  card.setLikeCount(objProp.likes.length);
  card.setLikes(objProp.likes);
  card.setLikeFunction(likeCard);
  card.setRemoveFunction(removeCard);
  return card;
}

/**
 * Функция добавления карточки (колбэк для сабмита попапа)
 * @param {String} placeName имя места
 * @param {String} placeLink ссылка на место
 */
function addPlace(placeName, placeLink) {

  api.addNewCard(placeName, placeLink)
    .then((res) => {
      cardsList.addCard(createCard(res).create());
    })
    .catch((err) => {
      console.log(`Ошибка при сохранении данных места: ${err}`);
    });
}

/**
 * Проверяет наличие userId в массиве объектов likes (вспомогательная)
 * @param {Array} likes
 * @returns {boolean} true - userId содержится в likes
 */
function isLikeable(likes) {
  return (likes.filter((item) => {
    return (item._id === currentAuthor.getUserId());
  }).length > 0);
}

/**
 * Возвращает возможность удалять карточку ownerId (вспомогательная)
 * @param {string} ownerId ид владельца карточки
 * @returns {boolean} true - userId может удалять карточку ownerId
 */
function isDeleteable(ownerId) {
  return (currentAuthor.getUserId() === ownerId);
}

/**
 * Like/Dislike карточки (коллбэк кнопки лайк карточки)
 * @param {string} cardId идентификатор карточки
 * @param {boolean} result установлен/не установлени лайк
 * @param {function} updateFunction функция обновления карточки
 */
function likeCard(cardId, result, updateFunction) {

  let promise = ((result) ? api.likeCard(cardId) : api.dislikeCard(cardId));
  promise
    .then((res) => {
      updateFunction.call(this, res.likes.length);
    })
    .catch((err) => {
      console.log(`Ошибка загрузки данных о лайках: ${err}`);
    });
}

/**
 * Функция удаления карточки (коллбэк для кнопки удалить на карточке)
 * @param {string} cardId идентификатор карточки
 * @returns {boolean} true - карточка удалена, false - не удалена
 */
function removeCard(cardId) {

  return api.deleteCard(cardId)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(`Ошибка при удалении: ${err}`);
      return false;
    });
}

/* --------------------Работа с данными автора----------------- */

/**
 * Формируем карточку автора
 */
function makeAuthor() {

  // загрузка с сервера
  api.loadAuthorData()
    .then(loadUserData)
    .catch((err) => {
      console.log(`Ошибка при загрузки данных пользователя ${err}`);
    });
}

/**
 * Обновление данных автора (вспомогательная функция)
 * @param {Object} userdata - данные автора
 */
function loadUserData(userdata) {
  currentAuthor.setUserInfo(userdata.name, userdata.about, userdata.avatar);
  currentAuthor.setUserId(userdata._id);
  currentAuthor.setAvatarUrl(userdata.avatar);
  currentAuthor.updateUserInfo();
}

/**
 * Функция обновления информации об авторе (колбэк для сабмита попапа)
 */
function updateUserInfo(name, desc) {

  return api.updateUserInfo(name, desc)
    .then((res) => {
      currentAuthor.setUserInfo(name, desc, null);
      currentAuthor.updateUserInfo();
      return res;
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении данных автора: ${err}`);
    });
}

/**
 * Обновление аватара (колбэк для сабмита попапа)
 */
function updateAvatar(newAvatarLink) {

  return api.updateAvatar(newAvatarLink)
    .then((res) => {
      currentAuthor.setUserInfo(res.name, res.about, res.avatar);
      currentAuthor.updateUserInfo();
      return res;
    })
    .catch((err) => {
      console.log(`Ошибка при обновлении аватара: ${err}`);
    });;
}

/* -----------------Работа с изображением--------------- */
/**
 * Показывает попап изображенияя из контекста текущей карточки
 * @param {string} linkImage ссылка на изображение
 */
function showImage(linkImage) {
  popupImage.setImageLink(linkImage);
  popupImage.open();
}


/* --------------------Обработчики событий-----------------------------------------*/

/**
 * Загрузка страницы
 */
document.addEventListener('DOMContentLoaded', makeDOM);