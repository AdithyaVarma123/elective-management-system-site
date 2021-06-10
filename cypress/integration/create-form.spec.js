// eslint-disable-next-line no-undef
describe("Forms", () => {
    it("should create form", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.wait(2000);
        cy.get(':nth-child(3) > .p-menuitem-link > .p-menuitem-text',{timeout:10000}).click();
        cy.wait(2000);
        cy.get('#p-tabpanel-0-label > .p-tabview-title',{timeout:10000}).click();
        cy.get('.p-calendar > .ng-tns-c64-12').click();
        cy.wait(2000);
        cy.get(':nth-child(3) > :nth-child(5) > .ng-tns-c64-12',{timeout:10000}).click();
        cy.get('#courseCode').type('1');
        cy.get('.p-autocomplete-dropdown > .p-button-icon').click();
        cy.wait(2000);
        cy.get('#pr_id_7_list > :nth-child(1)',{timeout:10000}).click();
        cy.get('.p-button-raised > .p-button-label').click();
        cy.get('.p-col-2 > .p-button > .p-button-label').click();
        cy.wait(2000);
        cy.get('#p-tabpanel-1-label',{timeout:10000}).click();
        cy.wait(2000);
        cy.get(':nth-child(1) > .p-col-2 > .p-grid > :nth-child(1) > .margin > .p-button-label',{timeout:10000}).click();
        cy.wait(2000);
        cy.get('.p-dialog-header-close-icon',{timeout:10000}).click();
        cy.wait(2000);
        cy.get(':nth-child(1) > .p-col-2 > .p-grid > :nth-child(2) > .margin > .p-button-label',{timeout:10000}).click();
        cy.wait(2000);
        cy.get('.p-dialog-header-close-icon',{timeout:10000}).click();
        cy.wait(2000);
        cy.get(':nth-child(1) > .p-col-2 > .p-grid > :nth-child(3) > .margin > .p-button-label',{timeout:10000}).click();
        cy.wait(2000);
        cy.get('.p-dialog-header-close-icon',{timeout:10000}).click();

    });
});