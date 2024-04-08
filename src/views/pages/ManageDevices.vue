<template>
    <h1>Manage Devices</h1>

    <p v-if="loading">loading..</p>
    <p v-if="error">ERROR: {{ error }}</p>

    <div v-if="!loading" v-for="i in group" :key="i.id">
        <GroupHolder :name="i.name" :group_id="i.id" :group="group" :device="device.filter(x => x.group_id == i.id)" />
    </div>

    <br />
    <div>
        <button v-on:click="showGroup = !showGroup">Add new group</button>
        <div v-if="showGroup">
            <input type="text" v-model="groupName" placeholder="Group name" />
            <br />
            <button v-on:click="addNewGroup">Add</button>
        </div>
        <button v-on:click="showDevice = !showDevice">Add new device</button>
        <div v-if="showDevice">
            <input type="text" v-model="deviceMac" placeholder="Device Mac Address" />
            <br />
            <input type="text" v-model="deviceName" placeholder="Device Name" />
            <br />
            <select v-model="deviceGroup">
                <p>Add device</p>
                <option disabled value="">Select a group</option>
                <option v-for="option in group" :value="option.id">{{ option.name }}</option>
            </select>
            <br />
            <button v-on:click="addNewDevice">Add</button>

            <div v-if="showNewToken">
                <p>Your token for the new device</p>
                <p>{{ newDeviceToken }}</p>
                <b>This will not be shown again</b>
            </div>
        </div>

    </div>


</template>

<script>
import { devices } from "../../../services/device.services"
import { groups } from "../../../services/group.services"

import GroupHolder from "../components/GroupHolder.vue"

export default {
    data() {
        return {
            group: [],
            device: [],
            error: "",
            loading: false,
            session_token: localStorage.getItem("session-token"),
            user_token: localStorage.getItem("user_token"),
            showGroup: false,
            groupName: "",
            showDevice: false,
            deviceMac: "",
            deviceName: "",
            deviceGroup: "",
            newDeviceToken: "",
            showNewToken: false
        }
    },
    components: {
        GroupHolder
    },
    mounted() {
        this.loading = true;
        // get all groups
        groups.getAllGroups(this.session_token, this.user_token)
            .then(response => {
                this.group = response
                console.log(response)

                this.getAllDevices();
            })
            .catch(err => {

                if (err === 404) {
                    this.error = "No groups found"
                }
                else {
                    this.error = "Error"
                }
                this.loading = false;
            })
    },
    methods: {
        getAllDevices() {
            devices.getAllDevices(this.session_token, this.user_token)
                .then(response => {
                    this.device = response
                    console.log(response)
                    this.loading = false
                })
                .catch(err => {

                    if (err === 404) {
                        this.error = "No groups found"
                    }
                    else {
                        this.error = "Error"
                    }
                    this.loading = false
                })
        },
        checkNull(item) {
            return (item === null || item === undefined || item === "")
        },
        addNewGroup() {
            const { groupName } = this
            if (this.group.find(i => i.name == groupName)) {
                console.log("name included")
            } else {
                groups.addNewDeviceGroup(this.session_token, this.user_token, groupName)
                    .then((response) => {
                        let newGroupId = response.insertId;
                        console.log(newGroupId)
                        this.group.push({ "id": newGroupId, "name": groupName })
                        this.showGroup = false;
                    })
                    .catch((err) => {
                        this.error = err;
                    })
            }
        },
        addNewDevice() {
            const { deviceMac, deviceName, deviceGroup, newDeviceToken, checkNull } = this

            if (checkNull(deviceMac) || checkNull(deviceName) || checkNull(deviceGroup)) {
                console.log("somethings null")
            } else {
                devices.addNewDevice(this.session_token, this.user_token, deviceMac, deviceName, deviceGroup)
                    .then((response) => {
                        this.device.push({ "mac_address": deviceMac, "name": deviceName, "group_id": deviceGroup })
                        this.newDeviceToken = response.token;
                        this.showNewToken = true;

                    })
                    .catch((err) => {
                        this.error = err;
                    })
            }
        }
    }
}

</script>