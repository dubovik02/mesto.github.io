/**
 * Класс попапа просмотра изображения
 */

import BasePopup from './BasePopup';

export default class PopupImage extends BasePopup {

    _imageLink = null;
    _imgContainer = null;
    _imageDOMElement = null;

    constructor(popupDOMElement, buttonOpen, buttonClose) {
        super(popupDOMElement, buttonOpen, buttonClose);
    }

    open() {
        this.addImage();
        super.open();
    }

    close() {
        this._imageDOMElement.remove();
        super.close();
    }

    setImageLink(imageLink) {
        this._imageLink = imageLink;
    }

    /**
     * Добавление в попап изображения
     */
    addImage() {

        this._imgContainer = this._popupDOMElement.querySelector('.popup-image__content');
        this._imageDOMElement = document.createElement('img');
        this._imageDOMElement.classList.add('popup-image__image');
        this._imageDOMElement.setAttribute('src', this._imageLink);
        this._imgContainer.appendChild(this._imageDOMElement);
    }

}