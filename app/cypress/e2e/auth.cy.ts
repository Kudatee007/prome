describe("Auth: Login & Register", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Login Flow", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/local", { fixture: "auth_login.json" }).as(
        "postAuth"
      );
    });

    it("logs in user and stores token + updates header", () => {
      cy.visit("/login");

      cy.get('[data-testid="login-email"]').type(
        "Timilehinkudaisi01@gmail.com"
      );
      cy.get('[data-testid="login-password"]').type("Password123");
      cy.get('[data-testid="login-submit"]').click();

      // Token should be set in localStorage
      cy.window().its("localStorage.pl_token").should("exist");

      // Should redirect to home page
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("shows error on invalid credentials (server 401)", () => {
      cy.intercept("POST", "**/auth/local", {
        statusCode: 401,
        body: { error: { message: "Invalid identifier or password" } },
      }).as("badLogin");

      cy.visit("/login");
      cy.get('[data-testid="login-email"]').type("bad@example.com");
      cy.get('[data-testid="login-password"]').type("wrongpass");
      cy.get('[data-testid="login-submit"]').click();
      cy.wait("@badLogin");

      cy.get('[data-testid="login-error"]')
        .should("be.visible")
        .and("contain.text", "Invalid");
    });

    it("validates required fields on login form", () => {
      cy.visit("/login");

      // Try to submit without filling fields
      cy.get('[data-testid="login-submit"]').click();

      // Should show validation errors
      cy.get('[data-testid="login-email-error"]')
        .should("be.visible")
        .and("contain.text", "Email is required");

      cy.get('[data-testid="login-password-error"]')
        .should("be.visible")
        .and("contain.text", "Password is required");
    });
  });

  describe("Registration Flow", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/local/register", {
        fixture: "auth_register.json",
      }).as("postRegister");
    });

    it("successfully registers a new user", () => {
      cy.visit("/signup");

      cy.get('[data-testid="register-firstName"]').type("John");
      cy.get('[data-testid="register-lastName"]').type("Doe");
      cy.get('[data-testid="register-email"]').type("john@example.com");
      cy.get('[data-testid="register-password"]').type("password123");
      cy.get('[data-testid="register-confirmPassword"]').type("password123");
      cy.get('[data-testid="register-submit"]').click();

      // Should redirect to home page
      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });

    it("validates password confirmation match", () => {
      cy.visit("/signup");

      cy.get('[data-testid="register-firstName"]').type("John");
      cy.get('[data-testid="register-lastName"]').type("Doe");
      cy.get('[data-testid="register-email"]').type("john@example.com");
      cy.get('[data-testid="register-password"]').type("password123");
      cy.get('[data-testid="register-confirmPassword"]').type(
        "differentpassword"
      );
      cy.get('[data-testid="register-submit"]').click();

      cy.get('[data-testid="register-confirmPassword-error"]')
        .should("be.visible")
        .and("contain.text", "Passwords do not match");
    });

    it("shows error when email is already taken", () => {
      cy.intercept("POST", "**/auth/local/register", {
        statusCode: 400,
        body: { error: { message: "Email is already taken" } },
      }).as("emailTaken");

      cy.visit("/signup");

      cy.get('[data-testid="register-firstName"]').type("John");
      cy.get('[data-testid="register-lastName"]').type("Doe");
      cy.get('[data-testid="register-email"]').type("existing@example.com");
      cy.get('[data-testid="register-password"]').type("password123");
      cy.get('[data-testid="register-confirmPassword"]').type("password123");
      cy.get('[data-testid="register-submit"]').click();

      cy.get('[data-testid="register-error"]')
        .should("be.visible")
        .and("contain.text", "Email is already taken");
    });
  });

  describe("Logout Flow", () => {
    it("logs out user and clears token", () => {
      // First login
      cy.intercept("POST", "**/auth/local", { fixture: "auth_login.json" }).as(
        "postAuth"
      );
      cy.visit("/login");
      cy.get('[data-testid="login-email"]').type("demi@example.com");
      cy.get('[data-testid="login-password"]').type("Password123");
      cy.get('[data-testid="login-submit"]').click();

      // Verify logged in
      cy.window().its("localStorage.pl_token").should("exist");

      // Click user menu with force: true to handle hidden mobile menu
      cy.get('[data-testid="user-menu"]').click({ force: true });

      // Click logout
      cy.contains(/Log out/i).click({ force: true });

      // Token should be removed
      cy.window().its("localStorage.pl_token").should("not.exist");
    });
  });
});
