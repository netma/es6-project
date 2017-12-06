import { userSkeleton } from './user.ui';
import { TimeComponent } from '../../components/time/time-component';

export class UserPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.initUI();
    this.loadEventUI();
    new TimeComponent();
  }

  initUI() {
    if (document.getElementsByTagName('section')[0]) {
      document.getElementsByTagName('section')[0].parentNode.removeChild(document.getElementsByTagName('section')[0]);
    }
    let contentHtml = this.getPageSkeleton();
    this.app.insertAdjacentHTML('afterbegin', contentHtml);
console.log(this.user.uid);
  }

  loadEventUI() {
    document.querySelector('#logout').addEventListener('click', _=>{
      this.fb.auth.signOut();
    });
  }

  getPageSkeleton(user) {
    let data = {};
    data.greeting = this.getGreeting();
    data.username = this.user.email.split('@')[0];
    return userSkeleton(data);
  }

  getGreeting() {
    let hour = new Date().getHours() + 1;
    switch (true) {
      case (hour >= 5 && hour < 12):
        return 'Good morning';
        break;
      case (hour >= 19 && hour < 23):
        return 'Good evening';
        break;
      case (hour >= 23 || hour < 5):
        return 'Good night';
        break;
      default:
        return 'Hello';
    }
  }
}
