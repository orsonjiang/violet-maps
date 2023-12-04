describe('selected map tests', () => {
    beforeEach(() => {
        cy.login("test.one@email.com", "testone123");
        cy.get('#explore-icon').click();
    });
    
    // describe('check explore', () => {
    //     it('should be in explore view', () => {
    //         cy.contains('All Maps').should('exist');
    //         cy.contains('Your Library').should('not.exist');
    //         cy.contains('North America Test-S').should('exist');
    //     });
    // });
    
    // describe('check selected map screen', () => {
    //     it('click on like', () => {
    //         cy.contains('North America Test-S').click();
    //         cy.url().should('include', '/app/map');
    //         cy.contains('North America Test-S').should('exist');
    //         cy.get("[data-cy='like']").click();
    //     });
    
    //     it('write a comment', () => {
    //         cy.contains('North America Test-S').click();
    //         cy.url().should('include', '/app/map');
    //         cy.contains('North America Test-S').should('exist');
    //         cy.get('#commentinput').type('This is from the Cypress test!{enter}');
    //         cy.contains('This is from the Cypress test!').should('exist');
    //     });
        
    // });
    
    // describe('search maps', () => {
    //     it('successful search for maps based on name', () => {
    //         cy.get('#searchbar').type('string{enter}');
    //         // wait because sometimes request takes longer than expected
    //         cy.wait(450);
    //         cy.contains('No maps').should('not.exist');
    //         cy.contains('NA - String').should('exist');
    //         cy.contains('janedoe').should('exist');
    //         cy.url().should('include', '/app/home');
    //         cy.contains('String map').should('exist');
    //         cy.contains('kafa').should('exist');
    //     });

    //     it('no results from search based on name', () => {
    //         cy.get('#searchbar').type('No Such Map would Exist{enter}');
    //         cy.contains('No maps').should('exist');
    //         cy.url().should('include', '/app/home');
    //     });

    //     it('successful search for maps based on username', () => {
    //         cy.contains('Map Name').click();
    //         cy.contains('Username').click();
    //         cy.get('#searchbar').type('kafa{enter}');
    //         // wait because sometimes request takes longer than expected
    //         cy.wait(450);
    //         cy.contains('Choropleth Map').should('exist');
    //         cy.url().should('include', '/app/home');
    //     });

    //     it('no results from search based on name', () => {
    //         cy.contains('Map Name').click();
    //         cy.contains('Username').click();
    //         cy.get('#searchbar').type('User that DNE{enter}');
    //         cy.contains('No maps').should('exist');
    //         cy.url().should('include', '/app/home');
    //     });
    // });
    
});