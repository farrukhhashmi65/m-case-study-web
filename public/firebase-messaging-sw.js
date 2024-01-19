// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBZZImaYn3SARaWasR1wo_2o7cXcLGMf1I",
  authDomain: "mashreq-web-push.firebaseapp.com",
  projectId: "mashreq-web-push",
  storageBucket: "mashreq-web-push.appspot.com",
  messagingSenderId: "505157567702",
  appId: "1:505157567702:web:510ccca718afb3f25bb577",
  measurementId: "G-52Z4M7CWHK"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
// Retrieve firebase background messaging listner

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
