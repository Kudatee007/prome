describe("Search & filter", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/professionals?**", { fixture: "professionals.json" }).as("getPros");
      cy.visit("/professionals");
      cy.wait("@getPros"); // initial list load
    });
  
    it("filters professionals by query text", () => {
      cy.get('input[placeholder="What service do you need?"]').as("searchInput").type("Kelechi");
  
      cy.get('[data-testid="pros-list"]').should("exist");
      cy.get('[data-testid="pro-card"]').should("have.length.at.least", 1);
      cy.get('[data-testid="pro-card"]').should("contain.text", "Kelechi");
    });
  });
  