export function userSkeleton(data) {
  return `
    <section>
      <header>
        <button id="logout">Logout</button>
      </header>
      <h2 id="time"></h2>
      <h1 id="welcome">${data.greeting} ${data.username}!</h1>
      <footer></footer>
    </section>
  `;
}
