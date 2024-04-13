<template>
    <div class="bg-info-subtle m-3 border border-3 border-black border-opacity-50">
        <h3 class="fw-bold text-decoration-underline">{{ name }}</h3>
        <div v-for="i in device" :key="i.mac_address">
            <DeviceComponent :device_mac="i.mac_address" :device_name="i.name" />
        </div>
        <div v-if="device.length == 0">
            <br />
            <i>No devices found</i>
            <br /> <br />
            <button v-on:click="deleteGroup" :id="group_id" class="btn btn-danger m-2">Delete Group</button>
            <div v-if="loading" class="spinner-border">
                <br />
                <span class="visually-hidden">Loading</span>
            </div>
        </div>
    </div>

</template>

<script>
import { groups } from "../../../services/group.services"
import DeviceComponent from "../components/DeviceComponent.vue"


export default {
    props: {
        group: Array,
        device: Array,
        group_id: Number,
        name: String

    },
    data() {
        return {
            loading: false,
            error: "",
            session_token: localStorage.getItem("session-token"),
            user_token: localStorage.getItem("user_token"),
        }
    },
    components: {
        DeviceComponent
    },
    methods: {
        deleteGroup() {
            this.loading = true;
            groups.deleteDeviceGroup(this.session_token, this.user_token, this.group_id)
                .then((response) => {
                    // device.filter(x => x.group_id == i.id)
                    this.$parent.group = this.$parent.group.filter(i => i.id != this.group_id)
                    this.loading = false
                })
                .catch((err) => {
                    this.error = err;
                    this.loading = false;
                })
        }
    }
}
</script>