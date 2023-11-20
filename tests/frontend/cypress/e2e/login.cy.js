describe('sign in tests', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    describe('invalid email as input', () => {
        it('error message from invalid email input', () => {
            cy.contains('Log In').click();
            cy.get('#email').type('InvalidEmail@dne.com');
            cy.get('#password').type('Invalid Password');
            cy.contains('Log in').click();
        })
    })

    describe('invalid password, valid email', () => {
        it('error message from invalid password but valid email', () => {
            cy.contains('Sign Up').click();
            cy.get('#firstName').type('Joe');
            cy.get('#lastName').type('Shmoe');
            cy.get('#email').type('Joe.Shmoe@email.com');
            cy.get('#username').type('JoeShmoe-inator');
            cy.get('#password').type('JoeShmoe2023');
            cy.get('#confirmPassword').type('JoeShmoe2023');
            cy.intercept('POST', '/auth/register', {});
            cy.get('#registerButton').click();
            cy.url().should('include', '/app/home');
            cy.get('#userAvatar').click();
            cy.contains("Log In").click();
            cy.url().should('include', '/login');
            cy.get('#email').type('Joe.Shmoe@email.com');
            cy.get('#password').type('InvalidPassword');
            cy.contains('Log in').click();

        })
    })
    /*
    it('log in as valid user', () => {
        cy.visit('/');
        cy.contains('Sign Up').click();
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#username').type('JoeShmoe-inator');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.intercept('POST', '/auth/register', {});
        cy.get('#registerButton').click();
        cy.url().should('include', '/app/home');
        cy.get('#userAvatar').click();
        cy.contains("Log In").click();
        cy.url().should('include', '/login');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#password').type('JoeShmoe2023');
        cy.contains('Log in').click();
        cy.url().should('include', '/app/home');
        cy.contains('Your Library');
        cy.contains('Map Name').click();
        cy.contains('Map Properties');
    })
    */
})