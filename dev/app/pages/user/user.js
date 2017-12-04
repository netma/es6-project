export class UserPage {
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
