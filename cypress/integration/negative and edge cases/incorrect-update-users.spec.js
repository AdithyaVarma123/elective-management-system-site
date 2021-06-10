// eslint-disable-next-line no-undef
describe("Users", () => {
    it("should update users", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.get(':nth-child(5) > .p-menuitem-link > .p-menuitem-text',{timeout:10000}).click();
        cy.get('#p-tabpanel-2-label > .p-tabview-title',{timeout:10000}).click();
        cy.get('#updateName').type('mohit');
        cy.get('#updatePass').type('admin');
        cy.get('#updateRollNo').type('cb.en.u4cse18155');
        cy.get('#updateBatch').type('2018-4-BTECH');
        cy.get('#p-tabpanel-2 > .p-grid > .p-col-12 > .p-button').click();
    });
});