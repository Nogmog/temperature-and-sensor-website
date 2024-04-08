const URL = import.meta.env.VUE_APP_API_URL;

const generateLink = (subDomain, token) => {
    return (URL + subDomain + "?user=" + token)
}

const getAllDevices = (session, user_token) => {
    return fetch(generateLink("api/modules", user_token),
        {
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw response
            }
        })
        .then((resJson) => {
            return resJson
        })
        .catch((err) => {
            console.log("Error:", err)
            return Promise.reject(err.status)
        })
}

const addNewDevice = (session, user_token, mac, name, group_id) => {
    return fetch(generateLink("api/modules/add", user_token),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            },
            body: JSON.stringify({
                "mac_address": mac,
                "name": name,
                "group_id": group_id
            })
        })
        .then((response) => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw response;
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((err) => {
            console.log(err);
            return Promise.reject(err.status);
        })
}

const deleteDevice = (session, user_token, device_id) => {
    return fetch(generateLink("api/modules/add", user_token),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            },
            body: JSON.stringify({
                "mac_address": mac,
                "name": name,
                "group_id": group_id
            })
        })
}

const getAllDataFromGroup = (session, user_token, id) => {
    return fetch(generateLink("api/modules/info/group/" + id, user_token),
        {
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            }
        })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            else {
                throw response;
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((err) => {
            if (err.status === 404) {
                return Promise.reject({ 404: "No data found" })
            }
            console.log(err);
            return Promise.reject(err.status);
        })
}

export const devices = {
    getAllDevices,
    addNewDevice,
    getAllDataFromGroup
}