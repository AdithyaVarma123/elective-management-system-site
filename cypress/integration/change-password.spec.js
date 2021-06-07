// eslint-disable-next-line no-undef
describe("Login", () => {
    it("should change password", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.get('[label="Change password"] > .p-button-label').click();
        cy.get('#oldpass').type('admin');
        cy.get('#newpass').type('admin');
        cy.get('.ng-star-inserted > .p-button > .p-button-label').click();
    });
});