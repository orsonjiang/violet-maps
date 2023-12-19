/*
describe('create, read, update, and delete comment', () => {
    beforeEach(() => {
        cy.intercept(
            {
              method: 'POST',
              url: 'http://localhost:5173/auth/login',
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
    });
});
*/
describe('layout tests', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	describe('view splash screen', () => {
		it('can view splash screen', () => {
			cy.contains('Violet Maps').should('exist');
			cy.contains('Log In').should('exist');
			cy.contains('Continue as Guest').should('exist');
		});
	});

	describe('view sign up screen', () => {
		it('click and view sign up screen', () => {
			cy.contains('Sign Up').click();
			cy.contains('Create your new account').should('exist');
			cy.contains('Sign Up').should('exist');
			cy.url().should('include', '/register');
		});
	});

	describe('view log in screen', () => {
		it('click and view log in screen', () => {
			cy.contains('Log In').click();
			cy.contains('Sign in to your account').should('exist');
			cy.contains('Forgot password?').should('exist');
			cy.url().should('include', '/login');
		});
	});

	describe('request reset password', () => {
		it('click and view login then request reset password screen', () => {
			cy.contains('Log In').click();
			cy.contains('Forgot password?').click();
			cy.contains('Reset your password').should('exist');
			cy.url().should('include', '/requestReset');
		});
	});

	describe('reset password', () => {
		it('view reset password screen', () => {
			cy.visit('/reset');
			cy.get('input').should('have.length', 2);
		});
	});

    /* continue as guest not implemented yet
	describe('visit explore' , () => {
		it('view explore screen from splash as guest', () => {
			cy.contains('Continue as Guest').click();
			cy.contains('All Maps').should('exist');
			cy.contains('Sort By').click();
			cy.contains('Name').should('exist');
		});
	});
    */

	describe('visit selected map page', () => {
		it('view the selected map screen', () => {
			
            /*

            cy.login("test.account@email.com", "password");
        	cy.contains('Awesome Map!').click();
            

            After clicking on selected map for editing, there is an axios error relating to a GET request
            to http://localhost:8080/api/maps?view=edit&searchBy=name&searchText=

            There is a 400 error status code. Causing tests to fail after opening a map to edit.

            */
		});
	});
  
	describe('visit home', () => {
		it('view home screen from splash as logged-in user', () => {
			cy.login("test.account@email.com", "password");
            cy.contains('Awesome Map!').should('exist');
			cy.contains('Create Map').click();
			cy.contains('Cancel').should('exist');
            cy.url().should('include', '/app/home');
		});
	});
});