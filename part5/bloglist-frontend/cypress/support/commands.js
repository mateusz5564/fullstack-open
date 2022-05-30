Cypress.Commands.add("login", (username, password) => {
  cy.request("POST", "http://localhost:3003/api/login", { username, password }).then(res => {
    window.localStorage.setItem("token", `bearer ${res.body.token}`);
  });
  cy.visit("http://localhost:3000");
});
