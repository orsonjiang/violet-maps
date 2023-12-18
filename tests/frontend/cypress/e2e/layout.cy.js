describe('view site layout', () => {
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
})