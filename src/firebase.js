import * as firebase from 'firebase'
var firebaseConfig = {
    //Database Config Info Removed
  };
  // Initialize Firebase
  
  const app = firebase.initializeApp(firebaseConfig);
  export const db = app.database();
  export const usersRef = db.ref('users/');
  //console.log(usersRef);
  export default firebase;