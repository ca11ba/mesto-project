const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '8599dc1b-69d9-4516-9da4-cb9c30e5f5cf',
        'Content-Type': 'application/json'
    }
}


export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }


            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}




export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: config.headers,
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }


            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}



export const redactUserInfoServer = (username, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: username,
            about: about
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }


            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}


export const addNewCardServer = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}



export const deleteCardServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}



export const putLikes = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}


export const removeLikes = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }).catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}



export const editProfileAvatarServer = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }


            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}
