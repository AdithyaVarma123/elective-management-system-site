
// eslint-disable-next-line no-undef
describe("users", () => {
    it("should add users", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.get(':nth-child(5) > .p-menuitem-link > .p-menuitem-text',{timeout:10000}).click();
        cy.get('#p-tabpanel-0-label > .p-tabview-title',{timeout:10000}).click();
        cy.get('#rollno',{timeout:10000}).type('cb.en.u4cse18155');
        cy.get('#uname').type('mohit');
        cy.get('#username').type('cb.en.u4cse18155');
        cy.get('#batch').type('2018-4-BTECH-CSE');
        cy.get('.p-col-12.ng-untouched > .p-button > .p-button-label').click();
    });
});