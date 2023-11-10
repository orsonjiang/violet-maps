describe('create, read, update, and delete comment', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('create comment', () => {
    it('can add a comment', () => {
      cy.get('input').type('This is a test comment written by Cypress.');
      cy.contains('Submit').click();
    })
  })

  describe('read comment', () => {
    it('can read a comment', () => {
      cy.contains('This is a test comment written by Cypress.');
    })
  })

  describe('edit comment', () => {
    it('can edit a comment', () => {
      cy.get('div:contains(This is a test comment written by Cypress.)').last().parent().find('button').first().click();
      cy.get('input').last().parent().find('input').type(" Added test editing.");
      cy.get('input').last().parent().find('button').first().click();
    })
  })

  describe('delete comment', () => {
    it('can delete a comment', () => {
      cy.get('div:contains(This is a test comment written by Cypress. Added test editing.)').last().parent().find('button').last().click();
      cy.get('div:contains(This is a test comment written by Cypress. Added test editing.)').should('not.exist');
    })
  })
})