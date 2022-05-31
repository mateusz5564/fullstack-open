/* eslint-disable quotes */
describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Mateusz Gawlak",
      username: "mateusz5564",
      password: "12345678",
    };
    const user2 = {
      name: "Adam Nowak",
      username: "adam",
      password: "qwerty",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.request("POST", "http://localhost:3003/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  it("Displays the login form by default", function () {
    cy.contains("login");
  });

  describe("Login", function () {
    it("Succedes with correct credentials", function () {
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
      cy.get('[data-testid="title-input"]').type("Awesome blog title");
      cy.get('[data-testid="author-input"]').type("John Doe");
      cy.get('[data-testid="url-input"]').type("www.test.com");
      cy.get('[data-testid="add-blog-button"]').click();
      cy.get("#blogs-list").contains("Awesome blog title");
    });

    describe("And several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog(
          "How to Center a Div with CSS",
          "Ihechikara Vincent Abba",
          "https://www.freecodecamp.org/news/how-to-center-a-div-with-css/"
        );
        cy.createBlog(
          "Building The Real App With React Query",
          "Georgii Perepecho",
          "https://www.smashingmagazine.com/2022/01/building-real-app-react-query/"
        );
        cy.createBlog(
          "Confessions of a Web Developer XIX",
          "David Walsh",
          "https://davidwalsh.name/confessions-xix"
        );
        cy.logout();
        cy.login("adam", "qwerty");
        cy.createBlog(
          "localStorage in JavaScript: A complete guide",
          "Nosa Obaseki",
          "https://blog.logrocket.com/localstorage-javascript-complete-guide/#removeitem"
        );
        cy.logout();
        cy.login("mateusz5564", "12345678");
      });

      it("A blog can be liked", function () {
        cy.get("#blogs-list").contains("Building The Real App With React Query").as("blogToLike");
        cy.get("@blogToLike").contains("view").click();
        cy.get("@blogToLike")
          .contains("like")
          .click()
          .wait(100)
          .click()
          .wait(100)
          .click()
          .wait(100);
        cy.get("@blogToLike").contains("likes 3");
      });

      it("User can delete his blogs", function () {
        cy.get("#blogs-list").contains("Confessions of a Web Developer XIX").as("blogToDelete");
        cy.get("@blogToDelete").contains("view").click();
        cy.get("@blogToDelete").get(".remove-btn").click();
        cy.get("#blogs-list").should("not.contain", "Confessions of a Web Developer XIX");
      });

      it("User can't delete not his own blogs", function () {
        cy.get("#blogs-list").contains("localStorage in JavaScript: A complete guide").as("blogNotOwn");
        cy.get("@blogNotOwn").contains("view").click();
        cy.get("@blogNotOwn").get(".remove-btn").should("not.exist");
      });

      it.only("blogs are rendered according to likes", function () {
        cy.get("#blogs-list").contains("localStorage in JavaScript: A complete guide").contains("like").click().wait(100).click();
        cy.get("#blogs-list").contains("Building The Real App With React Query").contains("like").click().wait(100);
        cy.get(".blog").eq(0).should("contain", "localStorage in JavaScript: A complete guide");
        cy.get(".blog").eq(1).should("contain", "Building The Real App With React Query");
      });
    });
  });
});
