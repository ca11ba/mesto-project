import '../pages/index.css';
import { enableValidation } from './validate.js';
import { initialCards, createCard} from './cards.js';
import { openModal, closeModal, closeWithClickOnOverlay} from './modal.js';





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
    const card = createCard(item, imagePopup, cardLinkPopup, cardNamePopup);
    places.append(card);
});

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
    const newCard = createCard({ name: cardNameValue, link: cardLinkValue }, imagePopup, cardLinkPopup, cardNamePopup);
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

function addNewCard(){
    document.querySelector('.popup__input_type_card-name').value = '';
    document.querySelector('.popup__input_type_url').value = '';
    openModal(cardPopup);

}



function redactUserInfo(){

    let userName = document.querySelector('.profile__title').textContent;
    let userInfo = document.querySelector('.profile__description').textContent;
    nameInput.value = userName;
    jobInput.value = userInfo;
    openModal(profilePopup);

}



closeWithClickOnOverlay();


const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);

