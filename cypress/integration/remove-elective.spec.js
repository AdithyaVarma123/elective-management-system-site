// eslint-disable-next-line no-undef
describe("Electives", () => {
    it("should remove elective", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.get(':nth-child(2) > .p-menuitem-link > .p-menuitem-text',{timeout:10000}).click();
        cy.get(':nth-child(2) > :nth-child(5) > .p-button-danger > .p-button-icon',{timeout:10000}).click();
        cy.get('.p-confirm-dialog-accept > .p-button-label',{timeout:10000}).click();
    });
});