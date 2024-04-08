const URL = import.meta.env.VUE_APP_API_URL;

const generateLink = (subDomain, token) => {
    return (URL + subDomain + "?user=" + token)
}

const getAllGroups = (session, user_token) => {
    return fetch(generateLink("api/group", user_token),
        {
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            }
        }
    )
        .then((response) => {
            console.log(response.status);
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

const addNewDeviceGroup = (session, user_token, name) => {
    return fetch(generateLink("api/group/add", user_token),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            },
            body: JSON.stringify({
                "name": name
            })
        })

        .then((response) => {
            console.log(response.status);
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
            return Promise.reject(err.status)
        })
}

const getAllDevicesFromGroupId = (session, user_token, id) => {
    return fetch(generateLink("api/group/" + id, user_token),
        {
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            }
        })
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
            console.log("Error:", err);
            return Promise.reject(err.status);
        })
}

const changeDeviceGroup = (session, user_token, newGroupId, mac) => {
    return fetch(generateLink(("api/group/" + newGroupId), user_token),
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            },
            body: JSON.stringify({
                "mac_address": mac
            })
        })
        .then((response) => {
            if (response.status === 204 || response.status === 304) {
                return response;
            } else {
                throw response
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error:", err)
            return Promise.reject(err.status)
        })
}

const addNewGroup = (session, user_token, name) => {
    return (generateLink("api/group/add", user_token),
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            },
            body: JSON.stringify({
                "name": name
            })
        }
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
                console.log("Error:", err)
                return Promise.reject(err.status)
            })
    )
}

const deleteDeviceGroup = (session, user_token, id) => {
    return fetch(generateLink(("api/group/" + id), user_token),
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "session-token": session
            }
        })

        .then((response) => {
            console.log(response.status);
            if (response.status === 200) {
                return response;
            } else {
                throw response
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            console.log("Error:", err)
            return Promise.reject(err.status)
        })
}

export const groups = {
    getAllGroups,
    addNewDeviceGroup,
    getAllDevicesFromGroupId,
    changeDeviceGroup,
    addNewGroup,
    deleteDeviceGroup
}