
// eslint-disable-next-line no-undef
describe("Login", () => {
    it("should visit login page", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.wait(3000);//login
        cy.get(':nth-child(5) > .p-menuitem-link > .p-menuitem-text').click();
        cy.wait(2000);
        cy.get('#p-tabpanel-0-label > .p-tabview-title').click();
        cy.wait(1000);
        cy.get('#rollno').type('cb.en.u4cse18155');
        cy.get('#uname').type('mohit');
        cy.get('#username').type('cb.en.u4cse18155');
        cy.get('#batch').type('2018-4-BTECH-CSE');
        cy.get('.p-col-12.ng-untouched > .p-button > .p-button-label').click();
    });
});