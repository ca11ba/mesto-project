import {openModal} from "./modal";
import {showCardsFromServer} from "./api";

function createCard(card, imagePopup, cardLinkPopup, cardNamePopup) {
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




function deleteCard(evt) {
    const card = evt.target.closest('.places__item');
    if (card) {
        card.remove();
    }
}


export {createCard, deleteCard};







