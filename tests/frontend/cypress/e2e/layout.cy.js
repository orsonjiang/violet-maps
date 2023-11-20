describe('create, read, update, and delete comment', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  describe('view splash screen', () => {
    it('can view splash screen', () => {
      cy.contains('Violet Maps');
      cy.contains('Log In');
      cy.contains('Continue as Guest');
    })
  })

  describe('view sign up screen', () => {
    it('click and view sign up screen', () => {
      cy.contains('Sign Up').click();
      cy.contains('Create your new account');
      cy.contains('Sign Up');
      cy.url().should('include', 'register');
    })
  })

  describe('view log in screen', () => {
    it('click and view log in screen', () => {
      cy.contains('Log In').click();
      cy.contains('Sign in to your account');
      cy.contains('Forgot password?');
      cy.url().should('include', '/login');
    })
  })

  describe('request reset password', () => {
    it('click and view login then request reset password screen', () => {
      cy.contains('Log In').click();
      cy.contains('Forgot password?').click();
      cy.contains('Reset your password');
      cy.url().should('include', '/requestReset');
    })
  })

  describe('reset password', () => {
    it('view reset password screen', () => {
      cy.visit('/reset');
      cy.get('input').should('have.length', 2);
    })
  })

  describe('visit home' , () => {
    it('view home screen from splash', () => {
      cy.contains('Continue as Guest').click();
      cy.url().should('include', '/app/home');
      cy.contains('Create Map');
      cy.contains('Sort By').click();
      cy.contains('Name');
    })
  })

  describe('visit map edit page', () => {
    it('view the map edit screen', () => {
      cy.contains('Continue as Guest').click();
      cy.url().should('include', '/app/home');
      cy.contains('Map of Europe').click();
      cy.contains('Map of Europe');
      cy.contains('America');
    })
  })
})