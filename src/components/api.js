function showCardsFromServer() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
        method: 'GET',
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf'
        }
    })
        .then(res => res.json())

}

function showUserInfoFromServer() {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
        method: "GET",
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf'
        },
    })
        .then(res => res.json());
}

function redactUserInfoFromServer(username, about) {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/users/me', {
        method: "PATCH",
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            about: about
        })
    })
        .then(res => res.json())
        .then(res => console.log(res));
}

function addNewCardToServer(name, link) {
    return fetch('https://nomoreparties.co/v1/apf-cohort-202/cards', {
        method: 'POST',
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json(); // ← это критически важно!
        })
        .catch((err) => {
            console.error("Ошибка в addNewCardToServer:", err);
            throw err; // пробрасываем дальше
        });
}

function deleteCardFromServer(cardId) {
    return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())
        .then(res => console.log(res));
}

function putLikesToCard(cardId) {
    return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
}


function removeLikesFromCard(cardId) {
    return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
            'Content-Type': 'application/json'
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
}

function editProfileAvatar(avatarUrl) {
    return fetch(`https://nomoreparties.co/v1/apf-cohort-202/users/me/${avatarUrl}`, {
        method: "PATCH",
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Ошибка: ${res.status}`);
            }
            return res.json();
        })
}




export {showCardsFromServer, showUserInfoFromServer, redactUserInfoFromServer, addNewCardToServer, deleteCardFromServer, putLikesToCard, removeLikesFromCard, editProfileAvatar};