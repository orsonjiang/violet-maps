// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add('login', (email, password) => {
    cy.intercept(
        {
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
        },
        {
            statusCode: 200,
            headers: {},
            body: {
            user: {
                _id: '6580c169bbc19f5c633b3185',
                username: 'test-account',
                firstName: 'Test',
                lastName: 'Account',
                email: 'test.account@email.com'
            },
            },
        },
    ).as('login');
    cy.visit('/login');
    cy.get('#email').type(email);
    cy.get('#password').type(password);
    cy.wait(250);
    cy.contains('Log in').click();
    cy.wait('@login').then(interception => {
        expect(interception.response.statusCode).to.equal(200);
    })
    cy.url().should('include', '/app/home');
});