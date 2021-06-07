describe("Login", () => {
    it("should display incorrect password", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admi');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
    });
});