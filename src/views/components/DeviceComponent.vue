<template>
    <div>

        <p v-on:click="openSettings" role="button"
            class="link-dark link-underline-opacity-0 link-underline-opacity-75-hover">{{ device_name }}
        </p>

        <div v-if="settingsMenu">
            <button v-on:click="groupMenuShown = !groupMenuShown" class="btn btn-primary m-1">Move Group</button>
            <button v-on:click="removeDeviceMenu = !removeDeviceMenu" class="btn btn-primary m-1">Delete Device</button>

            <div v-if="groupMenuShown">
                <br />
                <select v-model="newGroup" class="form-select">
                    <option disabled value="">Select a group</option>
                    <option v-for="option in this.$parent.group" :value="option.id">{{ option.name }}</option>
                </select>
                <button v-on:click="changeGroup" class="btn btn-primary m-1">OK</button>
            </div>
            <div v-if="removeDeviceMenu" class="bg-danger-subtle">
                <p>Do you want to delete <b>{{ device_name }}</b>?</p>
                <button v-on:click="deleteDevice" class="btn btn-danger m-1">yes</button>
                <button v-on:click="removeDeviceMenu = false" class="btn btn-primary m-1">no</button>
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