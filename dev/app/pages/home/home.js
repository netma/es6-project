import { UserPage } from '../user/user';

export class HomePage {
  constructor(app, fb) {
    this.app = app;
    this.fb = fb;
    this.title = 'Hello World';
    this.initUI();
  }

  initUI() {
    let contentHtml = `
      <section>
        <h1>${this.title}</h1>
        <form id="loginForm">
          <input type="email" name="email" placeholder="email">
          <input type="password" name="password" placeholder="password">
          <button type="submit">Login</button>
          <p id="switchForm">Click here to create new account</p>
        </form>
      </section>
    `;
    this.app.insertAdjacentHTML('afterbegin', contentHtml);
    this.loadEventUI();
  }

  loadEventUI() {
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', event=>this.onLogin(event));

    // switchForm
    document.getElementById('switchForm').addEventListener('click', event=> {
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
    console.log(formData);
    if (validationInput === 2) {
      ([...document.getElementById('switchForm').classList].includes('create'))
      ? this.fb.createEmailAccount(formData.email, formData.password)
      : this.fb.loginEmailAccount(formData.email, formData.password);
      //new UserPage(this.app, formData);
    }
  }
}
