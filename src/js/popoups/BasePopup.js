/**
 * Базовый класс попапа
 */

export default class BasePopup {

  _popupDOMElement = null;
  _buttonClose = null;
  _buttonOpen = null;
  _displayClassName = 'popup_is-opened';

  /**
   * Конструктор
   * @param {Element} popupDOMElement элемент попапа
   * @param {Element} buttonOpen кнопка открытия попапа
   * @param {Element} buttonClose кнопка закрытия попапа
   */
  constructor(popupDOMElement, buttonOpen, buttonClose) {

    this._popupDOMElement = popupDOMElement;
    this._buttonOpen = buttonOpen;
    this._buttonClose = buttonClose;
    this._setDefaultListeners();

  }

  /**
   * Устанавливает слушатели
   */
  _setDefaultListeners() {

    if (this._buttonOpen !== null) {
      this._buttonOpen.addEventListener('click', () => {
        this.open()
      });
    }

    if (this._buttonClose !== null) {
      this._buttonClose.addEventListener('click', () => {
        this.close()
      });
    }
  }

  /**
   * Открытие попапа
   */
  open() {
    document.addEventListener('keydown', this._escEvent);
    this._popupDOMElement.classList.add(this._displayClassName);
  }

  /**
   * Закрытие попапа
   */
  close() {
    document.removeEventListener('keydown', this._escEvent);
    this._popupDOMElement.classList.remove(this._displayClassName);
  }

  /**
   * Обработчик esc
   * @param {Event} event
   */
  _escEvent = (event) => {
    if (event.keyCode === 27) {
      this.close();
    }
  }

}
