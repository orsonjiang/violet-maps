describe('sign in tests', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    // describe('login', () => {
    //     it('error message from invalid email input', () => {
    //         cy.contains('Log In').click();
    //         cy.get('#email').type('jane.doe@testemail.com');
    //         cy.get('#password').type('Invalid Password');
            
    //         cy.intercept('POST', '/auth/login', {});
    //         cy.contains('Log in').click();
    //         cy.intercept("POST", "/api/maps", (req) => {
    //             req.body = {
    //                 searchBy: "Map Name",
    //                 searchText: "",
    //                 username: "",
    //                 view: "EXPLORE"
    //             }
    //             req.continue()
    //         })
    //     })
    // })

    describe('invalid email as input', () => {
        it('error message from invalid email input', () => {
            cy.contains('Log In').click();
            cy.get('#email').type('InvalidEmail@dne.com');
            cy.get('#password').type('Invalid Password');
            cy.contains('Log in').click();
            cy.url().should('include', '/login');
        })
    })

    describe('invalid password, valid email', () => {
        it('error message from invalid password but valid email', () => {
            cy.contains('Sign Up').click();
            cy.get('#firstName').type('Joe');
            cy.get('#lastName').type('Shmoe');
            cy.get('#email').type('Joe.Shmoe@email.com');
            cy.get('#username').type('JoeShmoe-inator');
            cy.get('#password').type('JoeShmoe2023');
            cy.get('#confirmPassword').type('JoeShmoe2023');
            cy.intercept('POST', '/auth/register', {});
            cy.get('#registerButton').click();
            cy.url().should('include', '/app/home');
            cy.get('#userAvatar').click();
            cy.contains("Log In").click();
            cy.url().should('include', '/login');
            cy.get('#email').type('Joe.Shmoe@email.com');
            cy.get('#password').type('InvalidPassword');
            cy.contains('Log in').click();
            cy.url().should('include', '/login');
        })
    })
    describe('valid login', () => {
        it('log into an existing account', () => {
            cy.contains('Log In').click();
            cy.get('#email').type('test.one@email.com');
            cy.get('#password').type('testone123');
            cy.intercept('POST', '/auth/login', {});
            cy.contains('Log in').click();
            cy.url().should('include', '/app/home');
            cy.contains('Sort By').click();
            cy.contains('Creation Date')
            cy.contains('Create Map');
        })
    })
    /*
    it('log in as valid user', () => {
        cy.visit('/');
        cy.contains('Sign Up').click();
        cy.get('#firstName').type('Joe');
        cy.get('#lastName').type('Shmoe');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#username').type('JoeShmoe-inator');
        cy.get('#password').type('JoeShmoe2023');
        cy.get('#confirmPassword').type('JoeShmoe2023');
        cy.intercept('POST', '/auth/register', {});
        cy.get('#registerButton').click();
        cy.url().should('include', '/app/home');
        cy.get('#userAvatar').click();
        cy.contains("Log In").click();
        cy.url().should('include', '/login');
        cy.get('#email').type('Joe.Shmoe@email.com');
        cy.get('#password').type('JoeShmoe2023');
        cy.contains('Log in').click();
        cy.url().should('include', '/app/home');
        cy.contains('Your Library');
        cy.contains('Map Name').click();
        cy.contains('Map Properties');
    })
    */
})