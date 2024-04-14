<template>
    <div>

        <p v-on:click="openSettings" role="button"
            class="link-dark link-underline-opacity-0 link-underline-opacity-75-hover">{{ device_name }}
        </p>

        <div v-if="settingsMenu">
            <button v-on:click="changeOptionChoice" id="moveGroup" class="btn btn-primary m-1">Move Group</button>
            <button v-on:click="changeOptionChoice" id="removeDevice" class="btn btn-primary m-1">Delete Device</button>

            <div v-if="settingChoice == 'moveGroup'" class="p-2">
                <select v-model="newGroup" class="form-select">
                    <option disabled value="">Select a group</option>
                    <option v-for="option in this.$parent.group" :value="option.id">{{ option.name }}</option>
                </select>
                <button v-on:click="changeGroup" class="btn btn-primary m-1">OK</button>
                <Loading v-if="loading"></Loading>
            </div>
            <div v-if="settingChoice == 'removeDevice'" class="bg-danger-subtle p-2">
                <p>Do you want to delete <b>{{ device_name }}</b>?</p>
                <button v-on:click="deleteDevice" class="btn btn-danger m-1">yes</button>
                <button v-on:click="removeDeviceMenu = false" class="btn btn-primary m-1">no</button>
                <Loading v-if="loading"></Loading>
            </div>

            <p v-if="error" class="alert alert-warning">{{ error }}</p>
        </div>
    </div>
</template>

<script>
import { groups } from "../../../services/group.services"
import Loading from "../components/Loading.vue"

export default {
    props: {
        device_name: String,
        device_mac: String,
    },
    components: {
        Loading
    },
    data() {
        return {
            error: "",
            loading: false,
            clicked: false,
            settingsMenu: false,
            groupMenuShown: false,
            settingChoice: "",
            removeDeviceMenu: false,
            newGroup: ""

        }
    },
    methods: {
        openSettings() {
            this.settingsMenu = !this.settingsMenu
            if (!this.settingsMenu) {
                this.settingChoice = "";
                this.error = "";
            }
        },
        changeOptionChoice(e) {
            let button = e.currentTarget.id;
            if (this.settingChoice === button) {
                this.settingChoice = "";
            } else {
                this.settingChoice = button;
                this.error = ""
            }
        },
        changeGroup(e) {
            const { newGroup } = this
            //check if value
            if (newGroup === null || newGroup === undefined || newGroup === "") {
                this.error = "Please input a group"
            } else {
                // check if same group
                if (newGroup == this.$parent.group_id) {
                    this.error = "Same group"
                } else {
                    this.loading = true
                    groups.changeDeviceGroup(this.$parent.session_token, this.$parent.user_token, newGroup, this.device_mac)
                        .then(response => {
                            if (response.status === 204) {
                                let index = this.$parent.$parent.device.findIndex((i) => i.mac_address == this.device_mac)
                                this.$parent.$parent.device[index].group_id = newGroup
                                this.error = "";
                                this.loading = false
                            }
                        })
                        .catch(err => {
                            if (err.status === 401) {
                                this.error = "Unauthorised for this device"
                                this.loading = false
                            } else {
                                this.error = "Error"
                                this.loading = false
                            }
                        })
                }
            }
        },
        deleteDevice(e) {
            this.error = "Currently not implemented";
            console.log("Requires update on API..")
        },
    }
}
</script>