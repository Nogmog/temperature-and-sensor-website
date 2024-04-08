<template>
    <h1>Landing Page</h1>

    <div>
        <button v-on:click="userSignIn">Google sign in</button>
        <button v-on:click="createAccount">Google sign up</button>
    </div>
    <div v-if="loading">Loading..</div>
    <div v-if="error"> ERROR {{ error }}</div>

    <br />


</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
import { users } from "../../../services/user.services"

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
        userSignIn(e) {
            if (this.submitted) {
                return false;
            }
            this.loading = true;
            this.submitted = true;
            this.error = "";

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
        sendToHomePage() {

        }

    }
}

</script>