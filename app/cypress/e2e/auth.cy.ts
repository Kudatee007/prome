describe("Auth: Login & Register", () => {
    beforeEach(() => {
      cy.intercept("POST", "**/auth/local", { fixture: "auth_login.json" }).as("postAuth");
    });
  
    it("logs in user and stores token + updates header", () => {
      cy.visit("/login");
  
      cy.get('[data-testid="login-email"]').type("demi@example.com");
      cy.get('[data-testid="login-password"]').type("Password123");
      cy.get('[data-testid="login-submit"]').click();
  
      // wait for the mocked network call
      cy.wait("@postAuth");
  
      // token should be set in localStorage
      cy.window().its("localStorage.pl_token").should("exist");
  
      // header should show user chip
      cy.get('[data-testid="user-chip"]').should("contain.text", "demi");
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
  
      cy.get('[data-testid="login-error"]').should("be.visible").and("contain.text", "Invalid");
    });
  });
  