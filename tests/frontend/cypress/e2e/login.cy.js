describe('sign in tests', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    describe('non-existing email as input', () => {
        it('error message from non-existing email input', () => {
            cy.get('#email').type('InvalidEmail@dne.com');
            cy.get('#password').type('Invalid Password');
            cy.contains('Log in').click();
            cy.url().should('include', '/login');
            cy.contains('Wrong email or password provided.').should('exist');
        });
    });

    describe('invalid password, valid email', () => {
        it('error message from invalid password but valid email', () => {
            cy.get('#email').type('test.one@email.com');
            cy.get('#password').type('Invalid Password');
            cy.contains('Log in').click();
            cy.url().should('include', '/login');
            cy.contains('Wrong email or password provided.').should('exist');
        });
    });

    describe('valid login', () => {
        it('successful log into an existing account', () => {
            cy.get('#email').type('test.one@email.com');
            cy.get('#password').type('testone123');
            cy.contains('Log in').click();
            cy.url().should('include', '/app/home');
            cy.contains('Sort By').click();
            cy.contains('Creation Date').should('exist');
            cy.contains('Create Map').should('exist');
            cy.get('#userAvatar').click();
            cy.contains('test.one@email.com').should('exist');
            cy.contains('Log out').click();
            cy.url().should('include', '/');
            cy.contains("Don't have an account?").should('exist');
        });
    });
});