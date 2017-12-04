import { UserPage } from '../user/user';

export class HomePage {
  constructor(app) {
    this.app = app;
    this.title = 'Hello World';
    this.initUI();
  }

  initUI() {
    let contentHtml = `
      <section>
        <h1>${this.title}</h1>
        <form id="loginForm">
          <input type="email" name="username" placeholder="email">
          <input type="password" name="password" placeholder="password">
          <button type="submit">Login</button>
        </form>
      </section>
    `;
    this.app.insertAdjacentHTML('afterbegin', contentHtml);
    this.loadEventUI();
  }

  loadEventUI() {
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', event=>this.onLogin(event));
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
      new UserPage(this.app, formData);
    }
  }
}
