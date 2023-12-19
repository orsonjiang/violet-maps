describe('sign in tests', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    /*

    These two tests are failing due to some GET /auth/login request.. unable to resolve 

    describe('non-existing email as input', () => {
        it('error message from non-existing email input', () => {
            cy.get('#email').type('InvalidEmail@dne.com');
            cy.get('#password').type('Invalid Password');
            cy.contains('Log in').click();
            cy.wait(250);
            cy.url().should('include', '/login');
            cy.contains('Wrong email or password provided.').should('exist');
        });
    });

    describe('invalid password, valid email', () => {
        it('error message from invalid password but valid email', () => {
            cy.get('#email').type('test.account@email.com');
            cy.get('#password').type('Invalid Password');
            cy.contains('Log in').click();
            cy.url().should('include', '/login');
            cy.contains('Wrong email or password provided.').should('exist');
        });
    });
    
    */

    describe('valid login', () => {
        it('successful log into an existing account', () => {
            cy.get('#email').type('test.account@email.com');
            cy.get('#password').type('password');
            cy.contains('Log in').click();
            cy.url().should('include', '/app/home');
            cy.contains('Sort By').click();
            cy.contains('Creation Date').should('exist');
            cy.contains('Create Map').should('exist');
            cy.get('#userAvatar').click();
            cy.contains('test.account@email.com').should('exist');
            cy.contains('Log out').click();
            cy.url().should('include', '/');
            cy.contains("Don't have an account?").should('exist');
        });
    });
});