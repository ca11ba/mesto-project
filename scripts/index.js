const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const redactUser = document.querySelector('.profile__edit-button');
const addCard = document.querySelector('.profile__add-button');
const profileFormElement = document.querySelector('[name="edit-profile"]');
const cardFormElement = document.querySelector('[name="new-place"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
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
    const card = evt.target.closest('.places__item');
    if (card) {
        card.remove();
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
    evt.preventDefault();
    let cardName = document.querySelector('.popup__input_type_card-name');
    let cardLink = document.querySelector('.popup__input_type_url');

    let cardNameValue = cardName.value;
    let cardLinkValue = cardLink.value;
    initialCards.unshift({
        name: cardNameValue,
        link: cardLinkValue
    });
    const newCard = createCard({ name: cardNameValue, link: cardLinkValue });
    places.prepend(newCard);
    closeModal(cardPopup);


}





function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let jobValue = jobInput.value;
    let nameValue = nameInput.value;

    let userName = document.querySelector('.profile__title');
    let userInfo = document.querySelector('.profile__description');

    userName.textContent = nameValue;
    userInfo.textContent = jobValue;
    closeModal(profilePopup);


}





function redactUserInfo(){

    let userName = document.querySelector('.profile__title').textContent;
    let userInfo = document.querySelector('.profile__description').textContent;
    nameInput.value = userName;
    jobInput.value = userInfo;
    openModal(profilePopup);

}


function openModal(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup){
    popup.classList.remove('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}




enableValidation(validationSettings);


function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closeModal(openedPopup);
    }
}

function closeWithClickOnOverlay() {
    const popupList = document.querySelectorAll('.popup');
    popupList.forEach((popup) => {
        popup.addEventListener('click', (el) => {
            if (el.target === popup) {
                closeModal(popup);
            }
        });
    });
}

closeWithClickOnOverlay();




