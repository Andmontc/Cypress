/// <reference types="cypress" />

context("Alert actions", () => {

    it("Perform login alert action", () => {
        cy.visit('http://executeautomation.com/demosite/Login.html')
        cy.get("[name='UserName']").type("admin");
        cy.get("[name='Password']").type("password");
        cy.get("input[value='Login']").click();
        cy.get("[name='generate']").click();

        cy.on('window:confirm', (str) => {
                expect(str).to.equal("You generated a Javascript alert");
                return true;
        })
    })

    it.only("Iframe Action", () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.get('#courses-iframe').then($iframe => {
            const $body = $iframe.contents().find('body');
            //store into an alias
            cy.wrap($body).as('iframe')
        })

        cy.get("@iframe").find(".btn.btn-theme.btn-sm.btn-min-block").click();
    })
})
