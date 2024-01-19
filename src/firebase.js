// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZZImaYn3SARaWasR1wo_2o7cXcLGMf1I",
    authDomain: "mashreq-web-push.firebaseapp.com",
    projectId: "mashreq-web-push",
    storageBucket: "mashreq-web-push.appspot.com",
    messagingSenderId: "505157567702",
    appId: "1:505157567702:web:510ccca718afb3f25bb577",
    measurementId: "G-52Z4M7CWHK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchPushMessagesToken = () => {
    Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
            console.log("Notification User Permission Granted.");
            return getToken(messaging, { vapidKey: 'BD5VHyeLcw2lFmP4a9TgjmY7yXKwUSXCoJbeoHO4uOtkBEQuu_O-aaJdoZSCEd6BSgiZQyz0gPIp5RMoFvesVuw' }).then((currentToken) => {
                if (currentToken) {
                    console.log('current token for client: ', currentToken);
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
        } else {
            console.log("User Permission Denied.");
        }
    });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });