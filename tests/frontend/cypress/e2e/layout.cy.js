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

	describe('visit explore' , () => {
		it('view explore screen from splash as guest', () => {
			cy.contains('Continue as Guest').click();
			cy.url().should('include', '/app/home');
			cy.contains('All Maps').should('exist');
			cy.contains('Sort By').click();
			cy.contains('Name').should('exist');
		});
	});

	// describe('visit selected map page', () => {
	// 	it('view the selected map screen', () => {
	// 		cy.login("test.one@email.com", "testone123");
    //     	cy.get('#explore-icon').click();
	// 		cy.wait(450);
	// 		cy.contains('North America Test-S').click();
	// 		cy.contains('North America Test-S').should('exist');
	// 		cy.url().should('include', '/app/map');
	// 		cy.contains('No tags').should('exist');
	// 	});
	// });
  
	// describe('visit home', () => {
	// 	it('view home screen from splash as logged-in user', () => {
	// 		cy.login("test.one@email.com", "testone123");
	// 		cy.contains('North America Test-S').should('exist');
	// 		cy.contains('Choropleth map - 12042023').should('exist');
	// 		cy.contains('Create Map').click();
	// 		cy.contains('Cancel').should('exist');
	// 	});
	// });
});