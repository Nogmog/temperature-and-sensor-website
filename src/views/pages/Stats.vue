<template>
    <h1 class="p-4 display-5 fw-bold">Stats</h1>

    <div>
        <select v-model="selectedGroup" @change="changeGroup($event)" class="form-control">
            <p>Select a group</p>
            <option v-for="option in allGroups" :value="option.id">{{ option.name }}</option>
        </select>
    </div>
    <Loading v-if="loading" class="m-5"></Loading>
    <p v-if="error" class="alert alert-warning m-2">{{ error }}</p>
    <div v-if="!loading && devices">
        <br />
        <TimeGraph :name="'Temperature Chart'" :devices="devices" :data="temperatureData" :yAxis="'temperature'" />
        <br />
        <TimeGraph :name="'Humidity Chart'" :devices="devices" :data="humidityData" :yAxis="'humidity'" />
    </div>
</template>

<script>
import TimeGraph from "../components/TimeGraph.vue"
import Loading from "../components/Loading.vue"
import { devices } from "../../../services/device.services"
import { groups } from "../../../services/group.services"


export default {
    components: {
        TimeGraph,
        Loading
    },
    data() {
        return {
            loading: true,
            error: "",
            session_token: localStorage.getItem("session-token"),
            user_token: localStorage.getItem("user_token"),
            devices: "",
            temperatureData: "",
            humidityData: "",
            allGroups: "",
            selectedGroup: "",
        }
    },
    mounted() {
        this.loading = true;
        groups.getAllGroups(this.session_token, this.user_token)
            .then((response => {
                this.allGroups = response;
                this.selectedGroup = response[0].id // DEFAULT SELECTED GROUP
                this.getDeviceInfo(this.selectedGroup)
                this.loading = false
            }))
            .catch(err => {
                console.log(err)
                this.error = err;
                this.loading = false;
            })

    },
    methods: {
        changeGroup(e) {
            // console.log("e", e.target.value)
            let id = e.target.value;

            this.getDeviceInfo(id)
        },
        getDeviceInfo(group_id) {
            this.loading = true;
            devices.getAllDataFromGroup(this.session_token, this.user_token, group_id)
                .then(response => {
                    this.handleData(response);
                    // this.loading = false;
                })
                .catch(err => {
                    if (err[404]) {
                        this.devices = [{ "none": "none" }]
                        this.temperatureData = []
                        this.humidityData = []
                    } else {
                        this.error = err;
                    }
                    this.loading = false;
                })
        },
        handleData(serverData) {
            let devices = [];
            let temperatureData = [];
            let humidityData = [];

            serverData.forEach(i => {
                let newDevice = false;
                let position = -1
                if (!devices.includes(i["name"])) { // CHECK IF DEVICE EXISTS ALREADY
                    devices.push(i["name"])
                    newDevice = true
                }

                position = devices.indexOf(i["name"])
                if (position === -1) { // err checking
                    console.log("err");
                    return false;
                }

                // converting date
                let date = new Date(i.date)
                date = Date.parse(date)

                // inputting data
                let temperatureObj = { "date": date, "temperature": i.temperature };
                let humidityObj = { "date": date, "humidity": i.humidity };
                if (newDevice) {
                    temperatureData.push([temperatureObj])
                    humidityData.push([humidityObj])
                } else {
                    temperatureData[position].push(temperatureObj)
                    humidityData[position].push(humidityObj)
                }
            });

            this.devices = devices;
            this.temperatureData = temperatureData;
            this.humidityData = humidityData

            this.loading = false;
        },
    }
}

</script>