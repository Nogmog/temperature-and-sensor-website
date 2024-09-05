<template>
    <h1 class="p-4 display-5 fw-bold">Landing Page</h1>

    <div>
        <button type="button" class="btn btn-primary m-2" v-on:click="userSignIn">Sign in</button>
        <button type="button" class="btn btn-primary m-2" v-on:click="createAccount">Sign up</button>
        <button type="button" class="btn btn-primary m-2" v-on:click="createAccountDemo">Create demo account</button>
    </div>
    <div v-if="loading" class="spinner-border m-3">
        <br />
        <span class="visually-hidden">Loading</span>
    </div>
    <div v-if="error" class="alert alert-warning"> ERROR {{ error }}</div>

    <br />


</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { users } from "../../../services/user.services"
import { getCurrentUser } from "../../../services/currentUser"

export default {
    data() {
        return {
            loading: false,
            error: "",
            submitted: false,
            session_token: localStorage.getItem("session-token"),
            user_token: localStorage.getItem("user_token"),
            user: ""
        }
    },
    methods: {
        async checkSignedIn() {
            let user = await getCurrentUser();

            if (user) {
                if (this.session_token == null || this.user_token == null) {
                    return false
                } else {
                    this.$router.push("/home")
                    return true;

                }
            }
        },
        async userSignIn(e) {
            if (this.submitted) {
                return false;
            }
            this.loading = true;
            this.submitted = true;
            this.error = "";

            let signedIn = await this.checkSignedIn();
            if (signedIn) {
                return true;
            }

            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((response) => {
                    const user = response.user;
                    this.user = user;
                    const uid = user.uid;
                    const email = user.email;

                    users.SignInUser(uid, email)
                        .then((result) => {
                            localStorage.setItem("session-token", result["session-token"]);
                            localStorage.setItem("user_token", uid)
                            this.loading = false;
                            this.submitted = false;
                            this.$router.push("/home")
                        })
                        .catch(error => {
                            this.error = error;
                            this.loading = false;
                            this.submitted = false;
                            signOut(auth);
                        })
                })
                .catch((error) => {
                    this.error = error;
                    console.log(error);
                    this.loading = false;
                    this.submitted = false;
                })
        },
        createAccount(e) {
            if (this.submitted) {
                return false;
            }
            this.loading = true;
            this.submitted = true;
            const provider = new GoogleAuthProvider();
            const auth = getAuth()
            signInWithPopup(auth, provider)
                .then((response) => {
                    const user = response.user;
                    const uid = user.uid;
                    const email = user.email;
                    const name = user.displayName;

                    users.createNewUser(uid, email, name)
                        .then((result) => {
                            localStorage.setItem("session-token", result["session-token"]);
                            localStorage.setItem("user_token", uid)
                            this.loading = false
                            this.submitted = false
                            this.$router.push("/home")

                        })
                        .catch(error => {
                            this.error = error;
                            signOut(auth);
                            this.loading = false
                            this.submitted = false
                        })
                })
                .catch((error) => {
                    this.error = error;
                    console.log(error);
                    this.loading = false
                    this.submitted = false
                })
        },
        createAccountDemo(e) {
            if (this.submitted) {
                return false;
            }
            this.loading = true;
            this.submitted = true;
            const provider = new GoogleAuthProvider();
            const auth = getAuth()
            signInWithPopup(auth, provider)
                .then((response) => {
                    const user = response.user;
                    const uid = user.uid;
                    const email = user.email;
                    const name = user.displayName;

                    users.createNewUserDemo(uid, email, name)
                        .then((result) => {
                            console.log("Backend login completed")
                            localStorage.setItem("session-token", result["session-token"]);
                            localStorage.setItem("user_token", uid)
                            this.loading = false
                            this.submitted = false
                            this.$router.push("/home")

                        })
                        .catch(error => {
                            this.error = error;
                            signOut(auth);
                            this.loading = false
                            this.submitted = false
                        })
                })
                .catch((error) => {
                    this.error = error;
                    console.log(error);
                    this.loading = false
                    this.submitted = false
                })
        },

    }
}

</script>

<style scoped>
.spinner-border {
    animation-duration: 2s;
}
</style>