import { userSkeleton } from './user.ui';
import { TimeComponent } from '../../components/time/time-component';
import { BackgroundComponent } from '../../components/background/background-component';

export class UserPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.initUI();
    this.loadEventUI();
    new TimeComponent();
    new BackgroundComponent();
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
    // logout
    document.querySelector('#logout').addEventListener('click', _=>{
      this.fb.auth.signOut();
    });

    // save new link
    document.getElementById('addLink').addEventListener('submit', event=>{
      event.preventDefault();
      let validationInput = 0;
      let formData = {};
      let formInputs = document.getElementById('addLink').elements;
      for (var i = 0; i < formInputs.length; i++) {
        if (formInputs[i].value) {
          formData[formInputs[i].name] = formInputs[i].value;
          validationInput++;
        }
      }
      if (validationInput === 2) {
        this.fb.dataNode = 'links';
        this.fb.firebasePush(this.user.uid, formData);
      }
      for (var i = 0; i < formInputs.length; i++) {
        if (formInputs[i].value) {
          formInputs[i].value = '';
        }
      }
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
