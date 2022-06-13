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

Cypress.Commands.add("logout", () => {
  window.localStorage.removeItem("user");
  cy.visit("http://localhost:3000");
});

Cypress.Commands.add("createBlog", (title, author, url) => {
  cy.request({
    method: "POST",
    url: "http://localhost:3003/api/blogs",
    body: { title, author, url },
    headers: { Authorization: `Bearer ${JSON.parse(window.localStorage.getItem("user")).token}` },
  });
  cy.visit("http://localhost:3000");
});
