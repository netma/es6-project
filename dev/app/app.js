import { HomePage } from './pages/home/home';
import { FirebaseProvider } from './providers/firebase/firebase-provider';

class MyApp {
  constructor() {
    this.app = document.querySelector('app');
    this.fb = new FirebaseProvider();
    this.start();
  }

  start() {
    this.fb.auth.onAuthStateChanged(user=>{
      if (user) {
        alert('TODO');
      } else {
        new HomePage(this.app, this.fb);
      }
    });
  }
}

let myApp = new MyApp();
