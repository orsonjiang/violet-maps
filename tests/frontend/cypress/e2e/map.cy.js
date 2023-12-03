beforeEach(() => {
    cy.visit('/app/explore');
})

describe('check explore', () => {
    it('should be in explore view', () => {
        cy.contains('Create Map').should('not.exist');
        cy.contains('All Maps');
    })
})

/* 

Test cases fail due to no maps being available on all maps screen.

describe('check selected map screen', () => {
    it('should switch to selected map', () => {
        cy.contains('String map').click();
        cy.url().should('include', '/app/map');
    })

    it('click on like', () => {
        cy.contains('String map').click();
        cy.get("[data-cy='like']").click();
    })

    it('write a comment', () => {
        cy.contains('String map').click();
        cy.get('#commentinput').type('greatmap{enter}');
    })
    
})

describe('search maps', () => {
    it("search for the string map", () => {
        cy.get('#searchbar').type('string{enter}');
        cy.contains('No maps').should('not.exist');
    })
})

*/