describe('view site layout', () => {
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
})