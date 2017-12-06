export function userSkeleton(data) {
  return `
    <section>
      <h2 id="time"></h2>
      <h1 id="welcome">${data.greeting} ${data.username}!</h1>
      <button id="logout">Logout</button>
    </section>
  `;
}
