import { loginSkeleton } from './login.ui';
import { UserPage } from '../user/user';

export class LoginPage {
  constructor(app, fb) {
    this.app = app;
    this.fb = fb;
    this.title = 'Welcome';
    this.initUI();
  }

  initUI() {
    if (document.getElementsByTagName('section')[0]) {
      document.getElementsByTagName('section')[0].parentNode.removeChild(document.getElementsByTagName('section')[0]);
    }
    let contentHtml = this.getPageSkeleton();
    this.app.insertAdjacentHTML('afterbegin', contentHtml);
    this.loadEventUI();
  }

  loadEventUI() {
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', event=>this.onLogin(event));

    // switchForm
    document.getElementById('switchForm').addEventListener('click', event=> {
      event.preventDefault();
      console.log([...document.getElementById('switchForm').classList].includes('create'))
      switch ([...document.getElementById('switchForm').classList].includes('create')) {
        case false:
          document.getElementById('switchForm').classList.toggle('create')
          document.getElementById('switchForm').innerHTML = 'Click here to login with existing account'
          document.forms[0].querySelector('button').innerHTML = 'Create an account'
          break;
        case true:
          document.getElementById('switchForm').classList.toggle('create')
          document.getElementById('switchForm').innerHTML = 'Click here to create new account'
          document.forms[0].querySelector('button').innerHTML = 'Login'
          break;
        default:
      }
    })
  }

  getPageSkeleton() {
    let data = {};
    data.title = this.title;
    return loginSkeleton(data);
  }

  onLogin(event) {
    event.preventDefault();
    let validationInput = 0;
    let formData = {};
    let formInputs = document.forms[0].elements;
    for (var i = 0; i < formInputs.length; i++) {
      if (formInputs[i].value) {
        formData[formInputs[i].name] = formInputs[i].value;
        validationInput++;
      }
    }
    if (validationInput === 2) {
      ([...document.getElementById('switchForm').classList].includes('create'))
      ? this.fb.createEmailAccount(formData.email, formData.password)
      : this.fb.loginEmailAccount(formData.email, formData.password);
    }
  }
}
