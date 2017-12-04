import { HomePage } from './pages/home/home';

class MyApp {
  constructor() {
    this.app = document.querySelector('app');
    this.start();
  }

  start() {
    let homePage = new HomePage(this.app);
  }
}

let myApp = new MyApp();
