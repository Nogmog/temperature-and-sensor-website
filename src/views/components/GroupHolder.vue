<template>
    <div>
        <b>{{ name }}</b>
        <div v-for="i in device" :key="i.mac_address">
            <DeviceComponent :device_mac="i.mac_address" :device_name="i.name" />
        </div>
        <div v-if="device.length == 0">
            <br />
            <i>No devices found</i>
            <br /> <br />
            <button v-on:click="deleteGroup" :id="group_id">Delete Group</button>
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
        deleteGroup(){
            groups.deleteDeviceGroup(this.session_token, this.user_token, this.group_id)
            .then((response) => {
                // device.filter(x => x.group_id == i.id)
                this.$parent.group = this.$parent.group.filter(i => i.id != this.group_id)

            })
            .catch((err) => {
                this.error = err;
            })
        }
    }
}
</script>