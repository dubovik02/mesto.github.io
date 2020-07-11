/**
 * Класс попапа редактирования данных автора
 */

import BaseEditPopup from './BasePopupEdit';

export default class PopupEditAuthor extends BaseEditPopup {

    _userInfo = null;

    constructor(popupDOMElement, buttonOpen, buttonClose, buttonSubmit, userInfo) {
        super(popupDOMElement, buttonOpen, buttonClose, buttonSubmit);
        this._userInfo = userInfo;
    }

    setUserInfo(userInfo) {
        this._userInfo = userInfo;
    }

    getUserInfo() {
        return this._userInfo;
    }

    open() {
        this._form.name.value = this._userInfo.getName();
        this._form.description.value = this._userInfo.getDescription();
        this._formValidator._checkValidity();
        super.open();
    }

    _submit() {
        const butText = this._buttonSubmit.textContent;
        this._buttonSubmit.textContent = "Обновление ....";
        const name = this._form.name.value;
        const desc = this._form.description.value;
        this.getSubmitFunction().call(this, name, desc)
            .then((res) => {
                this._buttonSubmit.textContent = butText;
                super._submit();
                return res;
            })
            .catch((err) => {
                console.log(`Ошибка при обновлении данных автора: ${err}`);
            });
    }

}