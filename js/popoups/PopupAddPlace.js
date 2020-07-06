/**
 * Класс попапа добавления места
 */

class PopupAddPlace extends BaseEditPopup {

    constructor(popupDOMElement, buttonOpen, buttonClose, buttonSubmit) {
        super(popupDOMElement, buttonOpen, buttonClose, buttonSubmit);
    }

    _submit() {
        const name = this.getForm().elements.name.value;
        const link = this.getForm().elements.link.value;
        this.getSubmitFunction().call(this, name, link);
        super._submit();
    }


}