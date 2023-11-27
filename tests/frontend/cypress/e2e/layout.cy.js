describe('create, read, update, and delete comment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
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
      cy.visit('http://localhost:5173/reset/');
      cy.get('input').should('have.length', 2);
    })
  })

  describe('visit explore' , () => {
    it('view explore screen from splash', () => {
      cy.contains('Continue as Guest').click();
      cy.url().should('include', '/app/home');
      cy.contains('All Maps');
      cy.contains('Sort By').click();
      cy.contains('Name');
    })
  })

//   describe('visit selected map page', () => {
//     it('view the selected map screen', () => {
//       cy.contains('Continue as Guest').click();
//       cy.url().should('include', '/app/home');
//       cy.contains('Map of Europe').click();
//       cy.contains('Map of Europe');
//       cy.contains('America');
//     })
//   })
  /*
  describe('visit selected map page', () => {
    it('view the selected map screen', () => {
      cy.contains('Continue as Guest').click();
      cy.url().should('include', '/app/home');
      cy.contains('This is one great map').click();
      cy.url().should('include', '/app/map');
      cy.contains('great');
      cy.contains('Export').click();
      cy.contains('JSON');
      cy.contains('0 Comments');
    })
  })
  */
  
})