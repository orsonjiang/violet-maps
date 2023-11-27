describe('map uploading modals are present', () => {
    it('order of map uploading modals are accurate', () => {
        cy.visit('/');
        cy.contains('Continue as Guest').click();
        cy.url().should('include', '/app/home');
        cy.get('#home-icon').click();
        cy.contains('Create Map').click();
        // first modal of the uploading map process
        cy.contains('Upload Map');
        cy.get('#file-upload').selectFile('./cypress/fixtures/test.geo.json', {force : true});
        cy.contains('Files Uploaded: test.geo.json');
        cy.contains('Confirm').click();
        // second modal of the uploading map process
        cy.contains('Choose Template');
        cy.contains('Heat Map').click();
        cy.contains('Confirm').click();
        // third modal of the uploading map process
        cy.contains('Enter Data Info');
        cy.contains('chosen template: heat');
        cy.get("[type='text']").type('Awesome Map');
        cy.contains('Confirm').click();
        // should be back on the home screen
        cy.url().should('include', '/app/home');
        cy.contains('Your Library');
    })
})