const URL = import.meta.env.VUE_APP_API_URL;

const SignInUser = (uid, email) => {
    console.log(uid, email);
    return fetch(URL + "api/user/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_token": uid,
                "email": email
            })
        }
    )
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw response
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((err) => {

            console.log("Error:", err)
            return Promise.reject(err.status)
        })
}

const createNewUser = (uid, email, name) => {
    return fetch(URL + "api/user/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_token": uid,
                "email": email,
                "name": name
            })
        }
    )
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw response
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((err) => {

            console.log("Error:", err)
            console.log(err)
            return Promise.reject(err.status)
        })
}

const createNewUserDemo = (uid, email, name) => {
    return fetch(URL + "api/user/create/test",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_token": uid,
                "email": email,
                "name": name
            })
        }
    )
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw response
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((err) => {

            console.log("Error:", err)
            console.log(err)
            return Promise.reject(err.status)
        })
}

const signOut = (session, user_token) => {
    return fetch((URL + "api/user/logout?user=" + user_token),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response;
            }
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err)
        })
}

export const users = {
    SignInUser,
    createNewUser,
    createNewUserDemo,
    signOut
}