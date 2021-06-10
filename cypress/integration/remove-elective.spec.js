// eslint-disable-next-line no-undef
describe("Electives", () => {
    it("should remove elective", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.wait(3000);
        cy.get(':nth-child(2) > .p-menuitem-link > .p-menuitem-text').click();
        cy.wait(1000);
        cy.get(':nth-child(2) > :nth-child(5) > .p-button-danger > .p-button-icon').click();
        cy.wait(1000);
        cy.get('.p-confirm-dialog-accept > .p-button-label').click();
    });
});