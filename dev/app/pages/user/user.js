import { userSkeleton } from './user.ui';

export class UserPage {
  constructor(app, fb, user) {
    this.app = app;
    this.fb = fb;
    this.user = user;
    this.initUI();
  }

  initUI() {
    if (document.getElementsByTagName('section')[0]) {
      document.getElementsByTagName('section')[0].parentNode.removeChild(document.getElementsByTagName('section')[0]);
    }
    let contentHtml = this.getPageSkeleton();
    this.app.insertAdjacentHTML('afterbegin', contentHtml);
    console.log(this.user.uid);
  }

  getPageSkeleton(user) {
    let data = {};
    data.username = this.user.email.split('@')[0];
    return userSkeleton(data);
  }
}
