/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// cypress/support/commands.ts
Cypress.Commands.add(
  "loginByApi",
  (email = "timmy@example.com", password = "Password123") => {
    // Option A: real login against Strapi
    // return cy.request('POST', `${Cypress.env('API_URL')}/auth/local`, { identifier: email, password })
    //   .then(resp => {
    //     window.localStorage.setItem('pl_token', resp.body.jwt);
    //     return resp;
    //   });

    // Option B: stubbed login (set token + user)
    cy.fixture("auth_login.json").then((body) => {
      window.localStorage.setItem("pl_token", body.jwt);
      // store user in localStorage if you read from it
      window.localStorage.setItem("auth_user", JSON.stringify(body.user));
    });
  }
);

Cypress.Commands.add("stubLogin", () => {
  cy.intercept("POST", "**/auth/local", { fixture: "auth_login.json" }).as(
    "postAuth"
  );
});

Cypress.Commands.add("loginByFixture", () => {
  cy.fixture("auth_login.json").then((body) => {
    window.localStorage.setItem("pl_token", body.jwt);
    window.localStorage.setItem("auth_user", JSON.stringify(body.user));
  });
});

Cypress.Commands.add("logoutLocal", () => {
  window.localStorage.removeItem("pl_token");
  window.localStorage.removeItem("auth_user");
});
