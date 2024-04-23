<!-- <script setup>
    import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
    import { useCurrentUser, useFirebaseAuth } from 'vuefire'


    const auth = getAuth()
    const user = useCurrentUser()

</script> -->

<template>
    <div>
        Login
    </div>
    <!-- <div v-if="user">
        User data
        <br />
        Logged in as {{ user.displayName }}
    </div> -->
    <!-- <button v-on:click="signInWithPopup(auth, new GoogleAuthProvider())">Google sign in</button> -->
    <button v-on:click="signOut(auth)">Google signout</button>
    <button v-on:click="userSignIn">Google sign in</button>
    <button v-on:click="createAccount">Google sign up</button>
    {{ error }}
</template>

<script>
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
    // import { useCurrentUser, useFirebaseAuth } from 'vuefire'

    // const auth = getAuth()
    import { users } from "../../../services/user.services"


    export default {
        data(){
            return {
                loading: true,
                error: ""
            }
        },
        methods: {
            userSignIn(e){
                const provider = new GoogleAuthProvider();
                const auth = getAuth();
                console.log(auth)
                signInWithPopup(auth, provider)
                .then((response) => {
                    // console.log("firebase log", response)
                    const user = response.user;
                    const uid = user.uid;
                    const email = user.email;
    
                    users.SignInUser(uid, email)
                    .then(result => {
                        localStorage.setItem("session-token", result["session-token"]);
                        localStorage.setItem("user_token", uid)
                    })
                    .catch(error => {
                        this.error = error;
                        signOut(auth);
                    })
                })
                .catch((error) => {
                    this.error = error;
                    console.log(error);
                })
            },
            createAccount(e){
                const provider = new GoogleAuthProvider();
                const auth = getAuth()
                signInWithPopup(auth, provider)
                .then((response) => {
                    const user = response.user;
                    const uid = user.uid;
                    const email = user.email;
                    const name = user.displayName;
    
                    users.createNewUser(uid, email, name)
                    .then(result => {
                        localStorage.setItem("session-token", result["session-token"]);
                        localStorage.setItem("user_token", uid)
                    })
                    .catch(error => {
                        this.error = error;
                        signOut(auth);
                    })
                })
                .catch((error) => {
                    this.error = error;
                    console.log(error);
                })
            },
        }
    }
</script>