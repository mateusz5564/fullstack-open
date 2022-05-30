describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Mateusz Gawlak",
      username: "mateusz5564",
      password: "12345678",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Displays the login form by default", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("succedes with correct credentials", function () {
      cy.get("#username").type("mateusz5564");
      cy.get("#password").type("12345678");
      cy.get("#login-button").click();
      cy.contains("mateusz5564 logged in");
    });

    it("Fails with wrong credentials", function () {
      cy.get("#username").type("mateusz5564");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.contains("invalid username or password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login("mateusz5564", "12345678");
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();
      cy.get("[data-testid=\"title-input\"]").type("Awesome blog title");
      cy.get("[data-testid=\"author-input\"]").type("John Doe");
      cy.get("[data-testid=\"url-input\"]").type("www.test.com");
      cy.get("[data-testid=\"add-blog-button\"]").click();
      cy.contains("Awesome blog title");
    });
  });
});
