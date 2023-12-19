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
    
    it('improper password input - password less than 8 chars', () => {
        cy.intercept(
            {
                method: 'POST',
                url: 'http://localhost:8080/auth/register',
            },
            {
                statusCode: 400,
                headers: {},
                body: {
                    error: 'Please enter a password of at least 8 characters.'
                },
            },
        ).as('failed-register');
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe1@email.com');
        cy.get('#username').type('JoeShmoe-inator1');
        cy.get('#password').type('Joe');
        cy.get('#confirmPassword').type('Joe');
        cy.wait(250);
        cy.get('#registerButton').click();
        cy.wait('@failed-register').then(interception => {
            if (interception.response) {
                expect(interception.response.statusCode).to.equal(400);
            }
        });
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
        cy.contains('Please enter a password of at least 8 characters.');
    });
    
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
    
    it('unsuccessful register - email already exists', () => {
        cy.intercept(
            {
                method: 'POST',
                url: 'http://localhost:8080/auth/register',
            },
            {
                statusCode: 400,
                headers: {},
                body: {
                    error: 'An account with this email address already exists.'
                },
            },
        ).as('failed-register');
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#username').type('JoeShmoe');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.wait(250);
        cy.get('#registerButton').click();
        cy.wait('@failed-register').then(interception => {
            if (interception.response) {
                expect(interception.response.statusCode).to.equal(400);
            }
        });
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
        cy.contains('An account with this email address already exists.');
    });

    it('unsuccessful register - username already exists', () => {
        cy.intercept(
            {
                method: 'POST',
                url: 'http://localhost:8080/auth/register',
            },
            {
                statusCode: 400,
                headers: {},
                body: {
                    error: 'An account with this username already exists.'
                },
            },
        ).as('failed-register');
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe2@email.com');
        cy.get('#username').type('JoeShmoe-inator');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.wait(250);
        cy.get('#registerButton').click();
        cy.wait('@failed-register').then(interception => {
            if (interception.response) {
                expect(interception.response.statusCode).to.equal(400);
            }
        });
        // stays on the same page, unsuccessful register
        cy.url().should('include', '/register');
        cy.contains('An account with this username already exists.');
    });
    
    it('successful register - goes to home page', () => {
        cy.intercept(
            {
                method: 'POST',
                url: 'http://localhost:8080/auth/register',
            },
            {
                statusCode: 200,
                headers: {},
                body: {
                    user: {
                        _id: 'cypress-demo-id',
                        username: 'new-user-cypress',
                        firstName: 'new',
                        lastName: 'user',
                        email: 'new.user@email.com',
                    },
                },
            },
        ).as('good-register');
        cy.get('#firstName').type('new');
        cy.get('#lastName').type('user');
        cy.get('#email').type('new.user@email.com');
        cy.get('#username').type('new-user-cypress');
        cy.get('#password').type('password');
        cy.get('#confirmPassword').type('password');
        cy.wait(250);
        cy.get('#registerButton').click();
        cy.wait('@good-register').then(interception => {
            if (interception.response) {
                expect(interception.response.statusCode).to.equal(200);
            }
        });
        cy.url().should('include', '/app/home');
    });
})