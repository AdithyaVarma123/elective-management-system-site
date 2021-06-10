// eslint-disable-next-line no-undef
describe("Electives", () => {
    it("should edit electives", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.wait(1500);
        cy.get(':nth-child(2) > .p-menuitem-link > .p-menuitem-text').click();
        cy.wait(1000);
        cy.get(':nth-child(1) > :nth-child(5) > .p-button-success > .p-button-icon').click();
        cy.get('#desc1').clear().type('principles of machine learning program');
        cy.get('[label="Update elective"] > .p-button-label').click();
    });
});