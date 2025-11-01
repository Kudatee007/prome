describe("Full user journey (happy path)", () => {
  beforeEach(() => {
    // Intercept professionals list
    cy.intercept("GET", "**/api/professionals?**", (req) => {
      const url = decodeURIComponent(req.url || "");

      // If the URL contains the search term 'Kelechi' return the filtered fixture
      if (url.includes("Kelechi")) {
        req.reply({ fixture: "professionals_search_kelechi.json" });
        return;
      }

      // If it's a detail request (has /api/professionals/<id>) return professional_detail.json
      if (
        /\/api\/professionals\/[^/?]+(\?.*)?$/.test(url) &&
        url.includes("/api/professionals/")
      ) {
        req.reply({ fixture: "professional_detail.json" });
        return;
      }

      // default list response
      req.reply({ fixture: "professionals.json" });
    }).as("getPros");

    // Intercept professional detail
    cy.intercept("GET", "**/api/professionals/*", {
      fixture: "professional_detail.json",
    }).as("getPro");

    // Intercept auth endpoints
    cy.intercept("POST", "**/auth/local/register", {
      fixture: "auth_register.json",
    }).as("register");

    cy.intercept("POST", "**/auth/local", {
      fixture: "auth_login.json",
    }).as("login");

    // Start at home
    cy.visit("/");
  });

  it("registers, logs in, searches, filters, views profile and logs out", () => {
    // -------------------
    // STEP 1: Register
    // -------------------
    cy.visit("/signup");

    cy.get('[data-testid="register-firstName"]').type("John");
    cy.get('[data-testid="register-lastName"]').type("Doe");
    cy.get('[data-testid="register-email"]').type("e2euser@example.com");
    cy.get('[data-testid="register-password"]').type("Password123!");
    cy.get('[data-testid="register-confirmPassword"]').type("Password123!");
    cy.get('[data-testid="register-submit"]').click();

    // redirect to home after registration
    cy.url().should("include", "/");

    // STEP 2: Login
    cy.visit("/login");

    cy.get('[data-testid="login-email"]').type("e2euser@example.com");
    cy.get('[data-testid="login-password"]').type("Password123!");
    cy.get('[data-testid="login-submit"]').click();

    // Verify token stored
    cy.window().its("localStorage.pl_token").should("exist");

    // header should show authenticated user menu
    cy.get('[data-testid="user-menu"]').first().should("exist");
    // -------------------
    // STEP 3: Header should Navigate to Professionals Page
    cy.get('[data-testid="header-search-input"]')
      .as("headerSearch")
      .should("exist");
    cy.get("@headerSearch").type("Kelechi{enter}");

    // should navigate to professionals with search param and call the filtered API
    cy.url().should("include", "/professionals?search=Kelechi");
    cy.get('[data-testid="pros-list"]').should("exist");
    cy.get('[data-testid="pro-card"]').its("length").should("be.gte", 1);

    // STEP 4: Search in Professionals Page
    cy.get('input[placeholder="What service do you need?"]')
      .as("searchInput")
      .type("Kelechi");
    cy.get("@searchInput").clear().type("Kelechi");

    // URL should update with search param
    cy.url().should("include", "search=Kelechi");

    // Assert filtered results
    cy.get('[data-testid="pro-card"]').should("have.length.at.least", 1);
    cy.get('[data-testid="pro-card"]')
      .first()
      .should("contain.text", "Kelechi");

    // STEP 5: View Professional Profile
    cy.get('[data-testid="pro-card"]')
      .first()
      .contains(/view profile/i)
      .click();

    // Assert navigated to detail page
    cy.url().should("include", "/professionals/");
    cy.get('[data-testid="pro-detail-name"]').should("exist");

    // STEP 6: Navigate Back
    cy.contains(/back/i).click();
    cy.url().should("not.include", "/professionals/");

    // STEP 7: Logout
    cy.get('[data-testid="user-menu"]').click({ force: true });
    cy.contains(/log out/i).click({ force: true });

    // Verify token cleared
    cy.window().its("localStorage.pl_token").should("not.exist");

    // Verify redirected and login link visible
    cy.get('a[href="/login"]').should("exist");
  });
});
