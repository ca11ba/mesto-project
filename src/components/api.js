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
        method: "POST",
        headers: {
            authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => res.json())
        .then(res => console.log(res));
}


export {showCardsFromServer, showUserInfoFromServer, redactUserInfoFromServer, addNewCardToServer};