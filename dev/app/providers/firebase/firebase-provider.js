import * as firebase from 'firebase';
import { CONFIG } from './config';

export class FirebaseProvider {
  constructor() {
    firebase.initializeApp(CONFIG);
    this.auth = firebase.auth();
    //console.log(firebase.database());
  }

  // Firebase signin with email + pwd
  createEmailAccount(email, password) {
    this.auth
        .createUserWithEmailAndPassword(email, password)
        .then(response => console.log(response))
        .catch((error)=> {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          alert(errorMessage)
        });
  }

  // Firebase login with email + pwd
  loginEmailAccount(email, password) {
    this.auth
        .signInWithEmailAndPassword(email, password)
        .then(response => console.log(response))
        .catch((error)=> {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          alert(errorMessage)
        });
  }
}
