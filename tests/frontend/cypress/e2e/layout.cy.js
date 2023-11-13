describe('create, read, update, and delete comment', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('view home screen', () => {
    it('can view home screen', () => {
      cy.contains('Violet Maps');
      cy.contains('Log In');
      cy.contains('Continue as Guest');
    })
  })

  describe('view sign up screen', () => {
    it('click and view sign up screen', () => {
      cy.contains('Sign Up').click();
      cy.contains('Register')
    })
  })

  describe('view log in screen', () => {
    it('click and view log in screen', () => {
      cy.contains('Log In').click();
      cy.contains('Sign in to your account')
    })
  })

  describe('request reset password', () => {
    it('click and view login then request reset password screen', () => {
      cy.contains('Log In').click();
      cy.contains('password?').click();
      cy.contains('Reset your password');
    })
  })

  describe('reset password', () => {
    it('view reset password screen', () => {
      cy.visit('/reset');
      cy.get('input').should('have.length', 2)
    })
  })

  describe('view home screen', () => {
    it('click and view home screen', () => {
      cy.contains('Continue as Guest').click();
      cy.contains('Your Library')
    })
  })

  describe('view edit map screen', () => {
    it('click and view edit map screen', () => {
      cy.contains('Continue as Guest').click();
      cy.contains('Map of Europe').click();
      cy.contains('Add Text');
    })
  })

  describe('view published map screen', () => {
    it('click and view published map screen', () => {
      cy.contains('Continue as Guest').click();
      cy.contains('Map of China').click();
      cy.contains('Comments');
    })
  })
})