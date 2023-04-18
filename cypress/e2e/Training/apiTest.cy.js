/// <reference types="cypress" />

context("API test on fake JSON server", () => {

    beforeEach("Delete before creating new value", () => {
        cy.request({
            method: 'DELETE',
            url: 'http://localhost:3000/posts/2',
            failOnStatusCode: false
        }).then((x) => {
            expect(x.body).to.be.empty
        });
    });

    it("APiTest GET", () => {
        cy.request('http://localhost:3000/posts/1').its('body').should('have.property', 'id');
    })

    it('APiTest POST', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:3000/posts',
            body: {
                "id": 2,
                "title": "Api Automation test in cypress",
                "author": "Andres Montes"
            }
        }).then((response) => {
            expect(response.body.id).to.equal(2);
            expect(response.body).has.property('title');
            expect(response.body.author).to.equal('Andres Montes');
        })
    })
});
