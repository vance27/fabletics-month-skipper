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
            loginToFabletics(
                email: string,
                password: string
            ): Chainable<Element>;
            handleFableticsPopups(): Chainable<Element>;
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

Cypress.Commands.add('handleFableticsPopups', () => {
    // Handle common popups that might appear

    // Email signup popup
    cy.get('body').then($body => {
        if ($body.find('[data-testid="email-signup-modal"]').length > 0) {
            cy.get(
                '[data-testid="email-signup-modal"] button[aria-label="Close"]'
            ).click();
        }
    });

    // Newsletter popup
    cy.get('body').then($body => {
        if ($body.find('.newsletter-popup').length > 0) {
            cy.get('.newsletter-popup .close-button').click();
        }
    });

    // Cookie consent
    cy.get('body').then($body => {
        if ($body.find('#cookie-consent').length > 0) {
            cy.get('#cookie-consent button[data-action="accept"]').click();
        }
    });

    // Promo banner
    cy.get('body').then($body => {
        if ($body.find('.promo-banner').length > 0) {
            cy.get('.promo-banner .close-btn').click();
        }
    });

    // Wait for any animations to complete
    cy.wait(1000);
});

Cypress.Commands.add('loginToFabletics', (email: string, password: string) => {
    // Visit the login page
    cy.visit('https://www.fabletics.com/login');

    // Wait for page to load
    cy.url().should('include', 'fabletics.com');

    // Handle any popups that might appear
    // cy.handleFableticsPopups();
    cy.get('body').then($body => {
        if ($body.find('.cf-browser-verification').length > 0) {
            cy.wait(5000); // Wait for auto-solve
        }
    });

    // Wait for login form to be visible
    cy.get('form', { timeout: 10000 }).should('be.visible');

    // Fill in email field
    cy.get('input[type="email"]', { timeout: 5000 })
        .should('be.visible')
        .clear()
        .type(email, { delay: 100 });

    // Fill in password field
    cy.get('input[type="password"]', { timeout: 5000 })
        .should('be.visible')
        .clear()
        .type(password, { delay: 100 });

    // Click login button
    cy.get('button[type="submit"]', { timeout: 5000 })
        .should('be.visible')
        .should('not.be.disabled')
        .click();

    // Wait for login to complete - check for successful redirect
    cy.url({ timeout: 15000 }).should('not.include', '/login');

    // Verify successful login by checking for user account elements
    cy.get('body').then($body => {
        // Check for account menu, user avatar, or welcome message
        if ($body.find('[data-testid="account-menu"]').length > 0) {
            cy.get('[data-testid="account-menu"]').should('be.visible');
        } else if ($body.find('.user-avatar').length > 0) {
            cy.get('.user-avatar').should('be.visible');
        } else if ($body.find('.account-link').length > 0) {
            cy.get('.account-link').should('be.visible');
        }
    });

    // Handle any post-login popups
    cy.handleFableticsPopups();

    // Wait for any final loading states
    cy.wait(2000);
});

// Example usage in a test:
/*
describe('Fabletics Login', () => {
  it('should login successfully', () => {
    cy.loginToFabletics('your-email@example.com', 'your-password');
    
    // Continue with your test after login
    cy.url().should('include', 'fabletics.com');
  });
});
*/
