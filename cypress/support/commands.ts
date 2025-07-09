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

export {};

declare global {
    namespace Cypress {
        interface Chainable<Subject> {
            login(email: string, password: string): void;
            downloadTcx(link: string): void;
        }
    }
}

// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    console.log('Custom command example: Login', email, password);
    const emailInput = cy.get('#email-input');
    const passInput = cy.get('#Password-input');
    const submit = cy.get('.MuiButton-label-274');
    emailInput.type(email);
    passInput.type(password);

    submit.click();
});

Cypress.Commands.add('downloadTcx', link => {
    console.log('Custom command example: Download', link);
    cy.visit(link);
    cy.wait(10000);
    // const downloadButton = cy.get('.MuiButton-label-274');
    // downloadButton.click();
});
