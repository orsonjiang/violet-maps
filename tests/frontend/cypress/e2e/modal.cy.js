describe('map uploading modals are present', () => {
    it('order of map uploading modals are accurate', () => {
        cy.visit('/');
        cy.contains('Continue as Guest').click();
        cy.contains('Create Map').click();
        // first modal of the uploading map process
        cy.contains('Upload Map');
        cy.get('#file-upload').selectFile('./cypress/e2e/simple.geojson', {force : true});
        cy.contains('Files Uploaded: simple.geojson');
        cy.contains('Confirm').click();
        // second modal of the uploading map process
        cy.contains('Choose Template');
        cy.contains('Heat Map').click({force : true});
        cy.contains('Confirm').click({force : true});
        // third modal of the uploading map process
        cy.contains('Select Data Properties');
        cy.get("[type='text']").type('Awesome Map');
        cy.contains('Confirm').click();
        // should be back on the home screen
        cy.url().should('include', '/app/home');
        cy.contains('Your Library');
    })
})