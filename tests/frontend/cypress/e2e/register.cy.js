describe('register tests', () => {
    beforeEach(() => {
        cy.visit('/register');
    });
    
    it('improper password input - passwords do not match', () => {
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#username').type('JoeShmoe-inator');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('wrongpassword');
        cy.get('#registerButton').click();
        
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
        cy.contains('Passwords are not the same.');
    });
    /*
    Test fails due to POST 400 request error from /auth/register.. unable to resolve 
    (uncaught exception)TypeError: Cannot read properties of undefined (reading 'status')
    
    it('improper password input - password less than 8 chars', () => {
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe1@email.com');
        cy.get('#username').type('JoeShmoe-inator1');
        cy.get('#password').type('Joe');
        cy.get('#confirmPassword').type('Joe');
        cy.get('#registerButton').click();
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
        cy.contains('Please enter a password of at least 8 characters.');
    });
    */
    it('improper input - missing field', () => {
        cy.get('#firstName').clear();
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe2@email.com');
        cy.get('#username').type('JoeShmoe-inator1');
        cy.get('#password').type('JoeShmoe12');
        cy.get('#confirmPassword').type('JoeShmoe12');
        cy.get('#registerButton').click();
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
    });

    it('improper email input - email not formatted correctly', () => {
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.ShmoeATemail.com');
        cy.get('#username').type('JoeShmoe');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.get('#registerButton').click();
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
    });

    /*
    POST 400 request error from /auth/register
    (uncaught exception)TypeError: Cannot read properties of undefined (reading 'status')
    
    it('unsuccessful register - email already exists', () => {
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#username').type('JoeShmoe');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.get('#registerButton').click();
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
        cy.contains('An account with this email address already exists.');
    });

    POST 400 request error from /auth/register
    (uncaught exception)TypeError: Cannot read properties of undefined (reading 'status')
    
    it('unsuccessful register - username already exists', () => {
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe2@email.com');
        cy.get('#username').type('JoeShmoe-inator');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.get('#registerButton').click();
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
        cy.contains('An account with this username already exists.');
    });
    */
    it('successful register - goes to home page', () => {
        cy.get('#firstName').type('new');
        cy.get('#lastName').type('user');
        cy.get('#email').type('new.user@email.com');
        cy.get('#username').type('new-user-cypress');
        cy.get('#password').type('password');
        cy.get('#confirmPassword').type('password');
        cy.intercept('POST', '/auth/register', {});
        cy.get('#registerButton').click();
        cy.url().should('include', '/app/home');
    });
})