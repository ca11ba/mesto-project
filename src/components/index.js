import '../pages/index.css';
import { enableValidation } from './validate.js';
import {createCard} from './cards.js';
import { openModal, closeModal, closeWithClickOnOverlay} from './modal.js';
import {
    getInitialCards,
    getUserInfo,
    redactUserInfoServer,
    addNewCardServer,
    editProfileAvatarServer
} from "./api";


const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const avatarPopup = document.querySelector('.popup_type_avatar');
const redactUser = document.querySelector('.profile__edit-button');
const addCard = document.querySelector('.profile__add-button');
const profileFormElement = document.querySelector('[name="edit-profile"]');
const cardFormElement = document.querySelector('[name="new-place"]');
const avatarFormElement = document.querySelector('[name="edit-avatar"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const closeButtons = document.querySelectorAll('.popup__close');
const places = document.querySelector('.places__list');
const cardLinkPopup = document.querySelector('.popup__image');
const cardNamePopup = document.querySelector('.popup__caption');
const profileAvatar = document.querySelector('.profile__image');
const profileSubmitButton = profilePopup.querySelector('.popup__button');
const cardSubmitButton = cardPopup.querySelector('.popup__button');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');


getInitialCards()
.then((cards) => {
    cards.forEach(item => {
        const card = createCard(item, imagePopup, cardLinkPopup, cardNamePopup);
        places.append(card);
    });
});


profilePopup.classList.toggle('popup_is-animated');
cardPopup.classList.toggle('popup_is-animated');
imagePopup.classList.toggle('popup_is-animated');
avatarPopup.classList.toggle('popup_is-animated');

redactUser.addEventListener('click',redactUserInfo);

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

addCard.addEventListener('click', addNewCard);

profileAvatar.addEventListener('click', editProfileAvatar);

cardFormElement.addEventListener('submit', handleCardFormSubmit);

avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

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

    renderLoading(true, cardSubmitButton)

    addNewCardServer(cardNameValue, cardLinkValue)
        .then((serverCard) => {
            const cardElement = createCard(serverCard, imagePopup, cardLinkPopup, cardNamePopup);
            places.prepend(cardElement);
            closeModal(cardPopup);
        })
        .catch((err) => {
            console.error("Ошибка при создании карточки:", err);
        }).finally((res) => {
            renderLoading(false, cardSubmitButton);
    });

    closeModal(cardPopup);


}


function handleAvatarFormSubmit(evt) {
    evt.preventDefault();

    let avatarLink = avatarPopup.querySelector('.popup__input_type_url');
    renderLoading(true, avatarSubmitButton)
    editProfileAvatarServer(avatarLink.value)
        .then((user) => {
            profileAvatar.style.backgroundImage = `url(${user.avatar})`;
            closeModal(avatarPopup);
        }).catch((err) => {
            console.error(err);
    }).finally((res) => {
        renderLoading(false, avatarSubmitButton);
    })

}


function showProfileInfoFromServer() {
    getUserInfo()
    .then((data) => {
        let userName = document.querySelector('.profile__title');
        let userDescription = document.querySelector('.profile__description');
        userName.textContent = data.name;
        userDescription.textContent = data.about;
        profileAvatar.style.backgroundImage = `url(${data.avatar})`;
    })
}

showProfileInfoFromServer();


function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    let jobValue = jobInput.value;
    let nameValue = nameInput.value;

    let userName = document.querySelector('.profile__title');
    let userInfo = document.querySelector('.profile__description');
    renderLoading(true, profileSubmitButton)
    redactUserInfoServer(nameValue, jobValue)
    .then((data) => {
        console.log(data);
        userName.textContent = data.name;
        userInfo.textContent = data.about;
        closeModal(profilePopup);
    }).catch((err) => {
            console.error(err);
        }).finally((res) => {
            renderLoading(false, profileSubmitButton);
        })
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

function editProfileAvatar() {
    openModal(avatarPopup);
}


function renderLoading(Isloading, button) {
    if (Isloading) {
        button.textContent = 'Сохранение...';
    }else{
        button.textContent = 'Сохранить';
    }
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

