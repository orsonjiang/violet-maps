describe('modal tests', () => {
    beforeEach(() => {
        cy.login("test.one@email.com", "testone123");
    });

    it('cancel button to hide modal', () => {
        cy.contains('Create Map').click();
        cy.contains('Upload Map').should('exist');
        cy.contains('Confirm').should('exist');
        cy.contains('Cancel').click();
        cy.contains('Upload Map').should('not.exist');
        cy.contains('Confirm').should('not.exist');
    });

    it('successful map creation', () => {
        cy.contains('Create Map').click();
        // first modal of the uploading map process
        cy.contains('Upload Map').should('exist');
        cy.get('#file-upload').selectFile('./cypress/fixtures/test.geo.json', {force : true});
        cy.contains('Files Uploaded: test.geo.json').should('exist');
        cy.contains('Confirm').click();
        // second modal of the uploading map process
        cy.contains('Choose Template').should('exist');
        cy.contains('Numerical Map').click();
        cy.contains('Confirm').click();
        // third modal of the uploading map process
        cy.contains('Enter Data Info').should('exist');
        cy.contains('chosen template: numerical').should('exist');
        cy.get("[type='text']").type('Test Map Created Through Cypress');
        cy.contains('scalerank').should('exist');
        cy.contains('Confirm').click();
        // should be on edit map screen
        cy.url().should('include', '/app/editmap');
        cy.contains('Test Map Created Through Cypress').should('exist');
        cy.get('#home-icon').click();
        cy.wait(450);
        // back to home page to see the newly created map
        cy.url().should('include', '/app/home');
        cy.contains('Test Map Created Through Cypress').should('exist');
    });
    
    it('missing file from upload - map creation', () => {
        cy.contains('Create Map').click();
        cy.contains('Upload Map').should('exist');
        cy.contains('Confirm').click();
        cy.contains('Error: Please upload a file :)').should('exist');
    });
});