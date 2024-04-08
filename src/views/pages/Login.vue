<template>
    <div>
        Login
    </div>
    <div v-if="user">
        User dataj
        <br />
        Logged in as {{ user.displayName }}
    </div>
    <!-- <button v-on:click="signInWithPopup(auth, new GoogleAuthProvider())">Google sign in</button> -->
    <button v-on:click="signOut(auth)">Google signout</button>
    <button v-on:click="userSignIn">Google sign in</button>
    <button v-on:click="createAccount">Google sign up</button>
    {{ error }}
</template>

<script>
    import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
    // import { useCurrentUser, useFirebaseAuth } from 'vuefire'

    // const auh = getAuth()
    import { users } from "../../../services/user.services"


    export default {
        data(){
            return {
                loading: true,
                error: ""
            }
        },

    }
</script>