import { authHeader } from '../helpers';

const serverAddress = "http://localhost:5000";

export const userService = {
    login,
    logout,
    getAll,
    resetPass

};

function login(id, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password })
    };
    return fetch(serverAddress + "/users/login", requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch("/users", requestOptions).then(handleResponse);
}

function resetPass(id, password , newPassword) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password, newPassword })
    };
    return fetch(serverAddress + "/users/reset", requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
