<template>
    <h1 class="p-4 display-5 fw-bold">Manage Devices</h1>
    <div>
        <button v-on:click="showButtons" id="group" class="btn btn-primary m-2">Add new group</button>
        <button v-on:click="showButtons" id="device" class="btn btn-primary m-2">Add new device</button>
        <div v-if="showButton == 'group'" class="bg-primary-subtle m-3 border border-3 border-black border-opacity-50">
            <input type="text" v-model="groupName" placeholder="Group name" class="form-control" />
            <br />
            <button v-on:click="addNewGroup" class="btn btn-primary">Add</button>
        </div>
        <div v-if="showButton == 'device'" class="bg-primary-subtle m-3 border border-3 border-black border-opacity-50">
            <input type="text" v-model="deviceMac" placeholder="Device Mac Address" class="form-control" />
            <br />
            <input type="text" v-model="deviceName" placeholder="Device Name" class="form-control" />
            <br />
            <select v-model="deviceGroup" class="form-select">
                <p>Add device</p>
                <option disabled value="">Select a group</option>
                <option v-for="option in group" :value="option.id">{{ option.name }}</option>
            </select>
            <br />
            <button v-on:click="addNewDevice" class="btn btn-primary m-2">Add</button>

            <div v-if="showNewToken" class="bg-warning-subtle">
                <p>Your token for the new device</p>
                <p>{{ newDeviceToken }}</p>
                <b>This will not be shown again</b>
            </div>
        </div>
        <!-- <p v-if="loading" class="spinner-border text-info">loading..</p> -->
        <p v-if="error">ERROR: {{ error }}</p>

        <div v-if="!loading" v-for="i in group" :key="i.id">
            <GroupHolder :name="i.name" :group_id="i.id" :group="group"
                :device="device.filter(x => x.group_id == i.id)" />
        </div>
    </div>

    <div v-if="loading" class="spinner-border m-3">
        <br />
        <span class="visually-hidden">Loading</span>
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
            showButton: "",
            groupName: "",
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
        showButtons(e) {
            let button = e.currentTarget.id;
            if (this.showButton === button) {
                this.showButton = "";
            } else {
                this.showButton = button
            }
        },
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
                        this.groupName = "";
                    })
                    .catch((err) => {
                        this.error = err;
                    })
            }
        },
        addNewDevice() {
            const { deviceMac, deviceName, deviceGroup, checkNull } = this

            if (checkNull(deviceMac) || checkNull(deviceName) || checkNull(deviceGroup)) {
                console.log("somethings null")
            } else {
                devices.addNewDevice(this.session_token, this.user_token, deviceMac, deviceName, deviceGroup)
                    .then((response) => {
                        this.device.push({ "mac_address": deviceMac, "name": deviceName, "group_id": deviceGroup })
                        this.newDeviceToken = response.token;
                        this.showNewToken = true;

                        this.deviceMac = "";
                        this.deviceName = "";
                        this.deviceGroup = "";

                    })
                    .catch((err) => {
                        this.error = err;
                    })
            }
        }
    }
}

</script>