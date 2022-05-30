Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "http://localhost:3003/api/login", { username, password }).then(res => {
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        token: res.body.token,
        name: res.body.name,
        username: res.body.username,
      })
    );
  });
  cy.visit("http://localhost:3000");
});
