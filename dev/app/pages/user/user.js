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
    this.addLink();
    this.updateLink();
    this.deleteLink();
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

    // update links
    document.getElementById('editableLinks').addEventListener('click', event=>{
      if (event.target.nodeName != 'BUTTON') {
        return;
      }
      let li = event.target.closest('li');
      switch (event.target.className) {
        case 'save':
          let updateData = {};
          for (let i=0; i < li.childNodes.length; i++) {
            if (li.childNodes[i].value) {
              updateData[li.childNodes[i].name] = li.childNodes[i].value;
            }
          }
          this.fb.firebaseUpdate(this.user.uid, li.id, updateData);
          break;
        case 'delete':
          this.fb.firebaseRemove(this.user.uid, li.id);
          break;
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

  // addHTML
  addLink() {
    this.fb.dataNode = 'links';
    this.fb
      .getFirebaseRef()
      .child(this.user.uid)
      .on('child_added', snapshot=>{
        document.querySelector('#links').insertAdjacentHTML('beforeend', `
          <li>
            <a href="${snapshot.val().url}" target="_blank">${snapshot.val().label}</a>
          </li>
        `);
        document.querySelector('#editableLinks').insertAdjacentHTML('beforeend', `
          <li id="${snapshot.key}">
            <input type="text" name="label" value="${snapshot.val().label}">
            <input type="url" name="url" value="${snapshot.val().url}">
            <button class="save">Save</button>
            <button class="delete">Delete</button>
          </li>
        `);
      });
  }

  updateLink() {
    this.fb.dataNode = 'links';
    this.fb
      .getFirebaseRef()
      .child(this.user.uid)
      .on('child_changed', snapshot=>{




      });
  }

  deleteLink() {
    this.fb.dataNode = 'links';
    this.fb
      .getFirebaseRef()
      .child(this.user.uid)
      .on('child_removed', snapshot=>{
        document.getElementById(snapshot.key).parentElement.removeChild(document.getElementById(snapshot.key));
    });
  }
}
