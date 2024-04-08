import { createApp } from 'vue'
import App from './App.vue'
// import { initializeApp } from "firebase/app"
// import { VueFire, VueFireAuth } from 'vuefire'
import router from './router'
import { firebaseApp } from "./firebase"

const app = createApp(App)
console.log("FIREBASE OPTIONS:", firebaseApp.options)
app.use(router)

// app.use(VueFire, {
//     firebaseApp,
//     modules: [
//         VueFireAuth()
//     ]
// })
app.use(firebaseApp);
app.mount('#app')
