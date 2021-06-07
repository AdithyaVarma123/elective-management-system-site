// eslint-disable-next-line no-undef
describe("Logout", () => {
    it("should logout successfully", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.wait(3000);
        cy.get('p-button > .p-button > .p-button-label').click();
    });
});