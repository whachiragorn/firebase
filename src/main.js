// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
Vue.config.productionTip = false

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAvuI__g-Wvl_uzAqZ5RCixPCyxGOVaHFw",
  authDomain: "egco427auth-c0b93.firebaseapp.com",
  databaseURL: "https://egco427auth-c0b93.firebaseio.com",
  projectId: "egco427auth-c0b93",
  storageBucket: "egco427auth-c0b93.appspot.com",
  messagingSenderId: "324198537481"
};
firebase.initializeApp(config);

window.firebase = firebase
let app

/* eslint-disable no-new */
firebase.auth().onAuthStateChanged((user)=>{


if(!app){
    app = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
}
})

