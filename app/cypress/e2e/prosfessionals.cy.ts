describe("Professionals List", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/professionals?**", { fixture: "professionals.json" }).as("getPros");
      cy.visit("/professionals");
    });
  
    it("renders a grid of professionals", () => {
      cy.get('[data-testid="pros-list"]').should("exist");
      cy.get('[data-testid="pro-card"]').its("length").should("be.gte", 1);
      cy.get('[data-testid="pro-card"]').first().should("contain.text", "Kelechi Okafor Enterprises");
    });
  
    it("navigates to pro detail when clicking View profile", () => {
      cy.get('[data-testid="pro-card"]').first().contains('View profile').click();
      cy.url().should("match", /\/professionals\/[a-z0-9]+$/);
      cy.get('[data-testid="pro-detail-name"]').should("exist");
    });
  });
  