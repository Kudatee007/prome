describe("Global Header Search", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/professionals?**", {
      fixture: "professionals.json",
    }).as("getPros");
    cy.visit("/");
  });

  it("navigates to professionals page with search query and shows results", () => {
    // header input selector
    cy.get('input[placeholder="What service do you need?"]').as(
      "headerSearch"
    );

    // type query and press Enter
    cy.get("@headerSearch").type("Kelechi{enter}");

    // route update
    cy.url().should("include", "/professionals?search=Kelechi");


    // results render correctly
    cy.get('[data-testid="pros-list"]').should("exist");
    cy.get('[data-testid="pro-card"]')
      .first()
      .should("contain.text", "Kelechi Okafor Enterprises");

    // confirm search term persisted in input
    cy.get('input[placeholder="What service do you need?"]').should(
      "have.value",
      "Kelechi"
    );
  });
});
