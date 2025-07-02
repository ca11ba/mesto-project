function openModal(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}

function closeModal(popup){
    popup.classList.remove('popup_is-opened');
    document.addEventListener('keydown', closeByEsc);
}


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

export {openModal, closeModal, closeByEsc, closeWithClickOnOverlay};