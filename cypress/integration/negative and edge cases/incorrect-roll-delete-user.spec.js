// eslint-disable-next-line no-undef
describe("Users", () => {
    it("should delete user", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.get(':nth-child(5) > .p-menuitem-link > .p-menuitem-text',{timeout:10000}).click();
        cy.get('#p-tabpanel-1-label > .p-tabview-title',{timeout:10000}).click();
        cy.get('#delrol').type('cb.en.u4cse12345');
        cy.get('#p-tabpanel-1 > .p-grid > .p-col-12 > .p-button').click();
    });
});