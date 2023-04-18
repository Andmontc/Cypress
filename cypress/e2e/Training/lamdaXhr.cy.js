/// <reference types="cypress" />

describe('Xhr test on Lambda Page', () => {
    beforeEach("Navigate to lambdatest", () => {
        cy.visit('https://accounts.lambdatest.com/login');
        cy.fixture("lambda").as("lambdaUser");
        cy.get("@lambdaUser").then((lambdauser) => {
            cy.get("[name='email']").debug().type(lambdauser.username);
            cy.get("[name='password']").debug().type(lambdauser.password, {log:false});
            });
        cy.get("#login-button").click();
    });
    it('Perform login and verify XHR', () => {
        // start the server
        cy.intercept('GET','https://accounts.lambdatest.com/api/user/organization/team').as('team')
        cy.intercept('GET','https://manual-api.lambdatest.com/ltms/organization/total-sessions').as('apiSessions')

        cy.wait("@team").then(({request, response}) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body.data[0]).to.have.property('name', 'Oscar Andrés Montes');
            expect(response.body.data[0].role).to.eq('Admin');
        })

        //explicit assertion
        cy.wait("@apiSessions").then(({request, response}) => {
            expect(response.statusCode).to.eq(200);
            expect(response.body).to.have.property('realtimeActiveTest', '0');
            expect(response.body).to.have.property('userTestsCount', 0);
        })

        // implicit assertions
        cy.get('@apiSessions').its('response.body').should('have.property', 'realtimeActiveTest').and('eql','0');
        });

        it('Perform login and test cookies', () => {
            // validate cookies
            cy.url().should('include', 'dashboard');
            cy.getCookie('user_id').should('exist');
            cy.getCookie('user_id').should('have.property', 'value', '1333846');
        });
});

