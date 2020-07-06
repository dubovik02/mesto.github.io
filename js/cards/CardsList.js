/**
 * Набор карточек
 */
class CardsList {

    _containerElement = null;

    /**
     * Конструктор
     * @param {Element} containerElement DOM-контейнер для карточек
     * @param {Element} cardDOMArr массив DOM-элементов карточек
     */
    constructor(containerElement) {
        this._containerElement = containerElement;
    }

    /**
     * Добавляет карточку
     * @param {Element} cardDOM DOM-элемент карточки
     */
    addCard(cardDOM) {
        this._containerElement.appendChild(cardDOM);
    }

    /**
     * Отрисовка списка мест
     */
    render(cardDOMArr) {
        cardDOMArr.forEach((item) => {
            this.addCard(item);
        });
    }
}