/// <reference types="cypress" />

describe('Xhr test on Lambda Page', () => {
    before("Navigate to lambdatest", () => {
        cy.visit('https://accounts.lambdatest.com/login');
    });
    it('Perform login and verify XHR', () => {
        // start the server
        cy.intercept('GET','https://accounts.lambdatest.com/api/user/organization/team').as('team')

        cy.fixture("lambda").as("lambdaUser");
        cy.get("@lambdaUser").then((lambdauser) => {
            cy.get("[name='email']").debug().type(lambdauser.username);
            cy.get("[name='password']").debug().type(lambdauser.password, {log:false});
            });
            cy.get("#login-button").click();

            cy.wait("@team").then(({request, response}) => {
                expect(response.statusCode).to.eq(200);
                expect(response.body.data[0]).to.have.property('name', 'Oscar Andrés Montes');
                expect(response.body.data[0].role).to.eq('Admin');

            })
        });
});
