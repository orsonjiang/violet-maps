describe('successful sign up', () => {
    it('fill in user sign up form and click on sign up', () => {
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
    })
})