<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div id="navbar">
        <RouterLink to="/home">Home</RouterLink> <br />
        <RouterLink to="/manage">Manage Devices</RouterLink> <br />
        <button v-on:click="signOutUser">Sign out</button>
        <div>
            <i v-if="loading">Loading..</i>
            <i v-if="error">{{ error }}</i>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"
import { users } from "../../../services/user.services"


export default {
    data() {
        return {
            loading: false,
            submitted: false,
            error: false,
            session_token: localStorage.getItem("session-token"),
            user_token: localStorage.getItem("user_token"),
        }
    },
    methods: {
        signOutUser() {
            // 401? also add verification for submit.
            if (this.submitted) {
                return false;
            }
            this.loading = true;
            this.submitted = true;

            users.signOut(this.session_token, this.user_token)
                .then((response) => {
                    localStorage.removeItem("session-token")
                    localStorage.removeItem("user_token")
                    signOut(getAuth())
                    this.loading = false
                    this.submitted = false
                    this.$router.push("/")
                })
                .catch((err) => {
                    this.error = err;
                    console.log(err);
                    this.loading = false
                    this.submitted = false
                })
        }
    }
}
</script>