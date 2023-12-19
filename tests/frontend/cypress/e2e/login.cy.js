describe('sign in tests', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    describe('non-existing email as input', () => {
        it('error message from non-existing email input', () => {
            cy.intercept(
                {
                    method: 'POST',
                    url: 'http://localhost:8080/auth/login',
                },
                {
                    statusCode: 401,
                    headers: {},
                    body: {
                        error: 'Wrong email or password provided.'
                    },
                },
            ).as('failed-login');
            cy.get('#email').type('InvalidEmail@dne.com');
            cy.get('#password').type('Invalid Password');
            cy.wait(250);
            cy.contains('Log in').click();
            cy.wait('@failed-login').then(interception => {
                if (interception.response) {
                    expect(interception.response.statusCode).to.equal(401);
                }
            });
            cy.url().should('include', '/login');
            cy.contains('Wrong email or password provided.').should('exist');
        });
    });

    describe('invalid password, valid email', () => {
        it('error message from invalid password but valid email', () => {
            cy.intercept(
                {
                    method: 'POST',
                    url: 'http://localhost:8080/auth/login',
                },
                {
                    statusCode: 401,
                    headers: {},
                    body: {
                        error: 'Wrong email or password provided.'
                    },
                },
            ).as('failed-login');
            cy.get('#email').type('test.account@email.com');
            cy.get('#password').type('Invalid Password');
            cy.wait(250);
            cy.contains('Log in').click();
            cy.wait('@failed-login').then(interception => {
                if (interception.response) {
                    expect(interception.response.statusCode).to.equal(401);
                }
            });
            cy.url().should('include', '/login');
            cy.contains('Wrong email or password provided.').should('exist');
        });
    });

    describe('valid login', () => {
        it('successful log into an existing account', () => {
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
            cy.get('#email').type('test.account@email.com');
            cy.get('#password').type('password');
            cy.wait(500);
            cy.contains('Log in').click();
            cy.wait('@login').then(interception => {
                if (interception.response) {
                    expect(interception.response.statusCode).to.equal(200);
                };
            });
            cy.url().should('include', '/app/home');
        });
    });
});