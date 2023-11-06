describe('Test 1', () => {
  it('visits site and checks for title', () => {
    cy.visit('/')
    cy.contains('Violet Maps Demo App (Build 1)')
  })
})
describe('Test 2', () => {
  it('has correct components', () => {
    cy.visit('/')
    cy.contains('Leave a Comment')
    cy.get('button').contains('Submit')
  }) 
})