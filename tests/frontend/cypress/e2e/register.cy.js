describe('register an account', () => {
    beforeEach(() => {
        cy.visit('/register');
    })
    it('improper password input - passwords do not match', () => {
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#username').type('JoeShmoe-inator');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('wrongpassword');
        cy.intercept('POST', '/auth/register', {});
        cy.get('#registerButton').click();
        cy.url().should('include', '/register');
        cy.contains('Passwords are not the same.');
        /*
        cy.request('POST', 'http://localhost:5173/auth/register', {
            email: "Joe.Shmoe@email.com",
            firstName: "Joe",
            lastName: "Shmoe",
            password: "JoeShmoe2023",
            username: "JoeShmoe-inator"
        }).its('body').as('currentUser');
        */
        /*
        cy.request('POST', '/register', {
            firstName: 'joe',
            lastName: 'shmoe',
            email: 'joe.shmoe@email.com',
            username: 'joeshmoe2023',
            password: 'JoeShmoe2023',
        })
        */
    })
    it('successful sign up - leads to home screen', () => {
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#username').type('JoeShmoe-inator');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.intercept('POST', '/auth/register', {});
        cy.get('#registerButton').click();
        cy.url().should('include', '/app/home');
        cy.contains('All Maps');
    })
})