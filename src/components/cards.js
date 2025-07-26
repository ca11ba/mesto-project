import {openModal} from "./modal";
import {deleteCardServer, putLikes, removeLikes} from "./api";

function createCard(card, imagePopup, cardLinkPopup, cardNamePopup, currentUserId) {
    let cardTemplate = document.querySelector('#card-template').content;
    let cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    let cardLikesCount = cardElement.querySelector('.card__likes-count');
    const likeButton = cardElement.querySelector('.card__like-button');
    cardElement.querySelector('.card__title').textContent = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardLikesCount.textContent = (card.likes || []).length;
    if (card.likes.find(user => (user._id === currentUserId))) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            removeLikes(card._id)
            .then((updatedCard) => {
                likeButton.classList.remove('card__like-button_is-active');
                cardLikesCount.textContent = updatedCard.likes.length;
                card.likes = updatedCard.likes;
            })
        }else{
            putLikes(card._id)
            .then((updatedCard) => {
                likeButton.classList.add('card__like-button_is-active');
                cardLikesCount.textContent = updatedCard.likes.length;
                card.likes = updatedCard.likes;

            })
                .catch((err) => console.error('Ошибка при добавлении лайка:', err));
        }
    });

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteCard(cardElement, card._id);
    });
    if (card.owner && card.owner._id != currentUserId) {
        deleteButton.remove()
    }

    const cardImage = cardElement.querySelector('.card__image');
    cardImage.addEventListener('click', () => {
        cardLinkPopup.src = card.link;
        cardNamePopup.textContent = card.name;
        openModal(imagePopup);
    });

    return cardElement;
}




function deleteCard(cardElement, cardId) {
    deleteCardServer(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch(err => {
            console.error("Ошибка при удалении карточки:", err);
        });
}


export {createCard, deleteCard};







