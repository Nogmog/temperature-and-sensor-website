<template>
    <div>

        <p v-on:click="openSettings">{{ device_name }}</p>

        <div v-if="settingsMenu">
            <button v-on:click="groupMenuShown = !groupMenuShown">Move Group</button>
            <button v-on:click="removeDeviceMenu = !removeDeviceMenu">Delete Device</button>

            <div v-if="groupMenuShown">
                <br />
                <select v-model="newGroup">
                    <option disabled value="">Select a group</option>
                    <option v-for="option in this.$parent.group" :value="option.id">{{ option.name }}</option>
                </select>
                <button v-on:click="changeGroup">OK</button>
            </div>
            <div v-if="removeDeviceMenu">
                <br />
                Are you sure?
                <button v-on:click="deleteDevice">yes</button>
                <button v-on:click="removeDeviceMenu = false">no</button>
            </div>
        </div>
    </div>
</template>

<script>
import { groups } from "../../../services/group.services"


export default {
    props: {
        device_name: String,
        device_mac: String,
    },
    data() {
        return {
            error: "",
            clicked: false,
            settingsMenu: false,
            groupMenuShown: false,
            removeDeviceMenu: false,
            newGroup: ""

        }
    },
    methods: {
        openSettings() {
            this.settingsMenu = !this.settingsMenu
            if (!this.settingsMenu) {
                this.groupMenuShown = false;
                this.removeDeviceMenu = false;
            }
        },
        changeGroup(e) {
            const { newGroup } = this
            //check if value
            if (newGroup === null || newGroup === undefined || newGroup === "") {
                console.log("value not changed")
            } else {
                // check if same group
                if (newGroup == this.$parent.group_id) {
                    console.log("same group")
                } else {
                    groups.changeDeviceGroup(this.$parent.session_token, this.$parent.user_token, newGroup, this.device_mac)
                        .then(response => {
                            if (response.status === 204) {
                                let index = this.$parent.$parent.device.findIndex((i) => i.mac_address == this.device_mac)
                                this.$parent.$parent.device[index].group_id = newGroup
                            }
                        })
                        .catch(err => {
                            if (err.status === 401) {
                                this.error = "Unauthorised for this device"
                            } else {
                                this.error = "Error"
                            }
                        })
                }
            }
        },
        deleteDevice(e) {
            console.log("Requires update on API..")
        },
    }
}
</script>