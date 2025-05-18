const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const redactUser = document.querySelector('.profile__edit-button');
const addCard = document.querySelector('.profile__add-button');
const profileFormElement = document.querySelector('[name="edit-profile"]');// Воспользуйтесь методом querySelector()// Находим поля формы в DOM
const cardFormElement = document.querySelector('[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name'); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()
const closeButtons = document.querySelectorAll('.popup__close');
const places = document.querySelector('.places__list');
const cardLinkPopup = document.querySelector('.popup__image');
const cardNamePopup = document.querySelector('.popup__caption');

profilePopup.classList.toggle('popup_is-animated');
cardPopup.classList.toggle('popup_is-animated');
imagePopup.classList.toggle('popup_is-animated');


initialCards.forEach(item => {
    const card = createCard(item);
    places.append(card);
})
function createCard(card) {
    let cardTemplate = document.querySelector('#card-template').content;
    let cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    const likeButton = cardElement.querySelector('.card__like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        cardLinkPopup.src = card.link;
        cardNamePopup.textContent = card.name;
        openModal(imagePopup);

    });



    return cardElement;


}

function addNewCard(){
    document.querySelector('.popup__input_type_card-name').value = '';
    document.querySelector('.popup__input_type_url').value = '';
    openModal(cardPopup);

}

function deleteCard(evt) {
    const card = evt.target.closest('.places__item'); // Находим карточку, родительскую по отношению к кнопке удаления
    if (card) {
        card.remove(); // Удаляем карточку
    }
}




redactUser.addEventListener('click',redactUserInfo);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCard.addEventListener('click', addNewCard);

cardFormElement.addEventListener('submit', handleCardFormSubmit);

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const popup = button.closest('.popup');
        closeModal(popup);
    });
});




function handleCardFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.
    // Получите значение полей jobInput и nameInput из свойства valu
    // Выберите элементы, куда должны быть вставлены значения полей
    let cardName = document.querySelector('.popup__input_type_card-name');
    let cardLink = document.querySelector('.popup__input_type_url');

    let cardNameValue = cardName.value;
    let cardLinkValue = cardLink.value;
    // Вставьте новые значения с помощью textContent
    initialCards.unshift({
        name: cardNameValue,
        link: cardLinkValue
    });
    const newCard = createCard({ name: cardNameValue, link: cardLinkValue });
    places.prepend(newCard);
    closeModal(cardPopup);


}




// Находим форму в DOM
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        // Так мы можем определить свою логику отправки.
        // О том, как это делать, расскажем позже.

        // Получите значение полей jobInput и nameInput из свойства value
    let jobValue = jobInput.value;
    let nameValue = nameInput.value;

        // Выберите элементы, куда должны быть вставлены значения полей
    let userName = document.querySelector('.profile__title');
    let userInfo = document.querySelector('.profile__description');
        // Вставьте новые значения с помощью textContent
    userName.textContent = nameValue;
    userInfo.textContent = jobValue;
    closeModal(profilePopup);


}



// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

function redactUserInfo(){

    let userName = document.querySelector('.profile__title').textContent;
    let userInfo = document.querySelector('.profile__description').textContent;
    nameInput.value = userName;
    jobInput.value = userInfo;
    openModal(profilePopup);

}


function openModal(popup){
    popup.classList.add('popup_is-opened');

}

function closeModal(popup){
    popup.classList.remove('popup_is-opened');

}


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
