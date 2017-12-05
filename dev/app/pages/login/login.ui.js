export function loginSkeleton(data) {
  return `
    <section>
      <h1>${data.title}</h1>
      <form id="loginForm">
        <input type="email" name="email" placeholder="email">
        <input type="password" name="password" placeholder="password">
        <button type="submit">Login</button>
        <p>
          <a href="" id="switchForm">Click here to create new account</a>
        </p>
      </form>
    </section>
  `;
}
