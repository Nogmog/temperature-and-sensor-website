<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div id="navbar">
        <RouterLink to="/home" class="btn">Home</RouterLink> <br />
        <RouterLink to="/manage" class="btn">Manage Devices</RouterLink> <br />
        <RouterLink to="/stats" class="btn">Stats</RouterLink>
        <div id="userInfo">
            <img :src="profile_pic">
            <button class="btn" v-on:click="signOutUser">Sign out</button>
            <div>
                <i v-if="loading" class="loading">Loading..</i>
                <i v-if="error" class="error">{{ error }}</i>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"
import { users } from "../../../services/user.services"
import { getCurrentUser } from "../../../services/currentUser"

export default {
    data() {
        return {
            loading: false,
            submitted: false,
            error: false,
            profile_pic: "",
            session_token: localStorage.getItem("session-token"),
            user_token: localStorage.getItem("user_token"),
        }
    },
    async mounted() {
        const user = await getCurrentUser()
        if (user) {
            this.profile_pic = user.photoURL
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

<!-- <style scoped>
#navbar {
    @apply w-screen max-h-16 flex bg-orange;
}

#navbar #userInfo {
    @apply justify-end;
}
</style> -->