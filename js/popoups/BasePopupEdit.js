/**
 * Базовый класс попапа редактирования сущностей
 */
class BaseEditPopup extends BasePopup {

    _form = null;
    _submitFunction = null;
    _formValidator = null;
    _buttonSubmit = null;

    constructor(popupDOMElement, buttonOpen, buttonClose, buttonSubmit) {
        super(popupDOMElement, buttonOpen, buttonClose);
        this._buttonSubmit = buttonSubmit;
        this._setDefaultSubmitOperation();
    }

    _setDefaultSubmitOperation() {
        this._buttonSubmit.addEventListener('click', () => {
            this._submit();
        }); 

    }

    setFormValidator(formValidator) {
        this._formValidator = formValidator;
    }

    getFormValidator() {
        return this._formValidator;
    }

    setForm(form) {
        this._form = form;
        this._form.addEventListener('keydown', () => {
            if (event.keyCode === 13) {
                if (!this._buttonSubmit.getAttribute('disabled')) {
                    this._submit();
                    event.preventDefault();
                }
            }
        });
    }

    getForm() {
        return this._form;
    }

    setSubmitFunction(submitFunction) {
        this._submitFunction = submitFunction;
    }

    getSubmitFunction() {
        return this._submitFunction;
    }

    /**
     * Функция сабмита переопределяемая в наследниках.
     */
    _submit() {
        //event.preventDefault();
        this.close();
    }

    close() {
        this._form.reset();
        this._formValidator._checkValidity();
        super.close();
    }

}