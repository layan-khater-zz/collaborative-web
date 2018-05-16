
// Initialize Firebase
export let config = {
  apiKey: "AIzaSyB__a3Pk1c1GDQc2zknguIfu4_ECZBbUW0",
  authDomain: "together-d9ca0.firebaseapp.com",
  databaseURL: "https://together-d9ca0.firebaseio.com",
  projectId: "together-d9ca0",
  storageBucket: "together-d9ca0.appspot.com",
  messagingSenderId: "905615168908"
};
export let init=firebase.initializeApp(config);
export let database=firebase.database().ref();
export let auth=firebase.auth();
