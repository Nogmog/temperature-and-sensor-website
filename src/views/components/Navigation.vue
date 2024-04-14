<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-info-subtle bg-body-tertiary shadow-sm mx-auto text-center"
        role="navigation">
        <div class="container-md">
            <RouterLink to="/home" class="col nav-link fs-5 text-dark">
                Home
            </RouterLink> <br />
            <RouterLink to="/manage" class="col nav-link fs-5 text-dark">
                Manage Devices
            </RouterLink>
            <br />
            <RouterLink to="/stats" class="col nav-link fs-5 text-dark">
                Stats
            </RouterLink>
            <div class="col nav-link dropdown-center">
                <a class="nav-link" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <img v-if="profile_pic" class="rounded-circle" :src="profile_pic" alt="Profile picture">
                </a>
                <div class="dropdown-menu dropdown-menu-end bg-info-subtle shadow">
                    <a class="dropdown-item" role="button" v-on:click="signOutUser">Sign out</a>
                    <div v-if="error" class="dropdown-item">
                        <i class="navbar-text">>{{ error }}</i>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth"
import { users } from "../../../services/user.services"
import { getCurrentUser } from "../../../services/currentUser"

export default {
    data() {
        return {
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
                    console.log(err);
                    this.submitted = false
                })
        }
    }
}
</script>