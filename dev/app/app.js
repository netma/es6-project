class MyApp {
  constructor() {
    this.app = document.querySelector('app');
    this.start();
  }

  start() {
    let homePage = new HomePage(this.app);
  }
}

class HomePage {
  constructor(app) {
    this.app = app;
    this.title = 'Hello World';
    this.initUI();
    this.loadEventUI();
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
  }

  loadEventUI() {
    let loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', event=>this.onLogin(event));
  }

  onLogin(event) {
    event.preventDefault();
    let formData = {};
    let formInputs = document.forms[0].elements;
    for (var i = 0; i < formInputs.length; i++) {
      if (formInputs[i].value) {
        formData[formInputs[i].name] = formInputs[i].value;
      }
    }
    new UserPage(this.app, formData);
  }
}

class UserPage {
  constructor(app, formData) {
    this.app = app;
    this.formData = formData;
    this.initUI();
  }

  initUI() {
    this.app.innerHTML = '';
    let contentHtml = `
      <section>
        <h1>Hello ${this.formData.username}</h1>
      </section>
    `;
    this.app.insertAdjacentHTML('afterbegin', contentHtml);
  }
}

let myApp = new MyApp();
