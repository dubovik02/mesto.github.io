/**
 * Класс попапа редактирования аватара
 */

import BaseEditPopup from './BasePopupEdit';

export default class PopupEditAvatar extends BaseEditPopup {


    constructor(popupDOMElement, buttonOpen, buttonClose, buttonSubmit) {
        super(popupDOMElement, buttonOpen, buttonClose, buttonSubmit);
    }

    _submit() {
        const butText = this._buttonSubmit.textContent;
        this._buttonSubmit.textContent = "Обновление ....";
        this.getSubmitFunction().call(this, this._form.link.value)
            .then((res) => {
                this._buttonSubmit.textContent = butText;
                super._submit();
                return res;
            })
            .catch((err) => {
                console.log(`Ошибка при обновлении аватара: ${err}`);
            });
    }

}