// eslint-disable-next-line no-undef
describe("Login", () => {
    it("forgot password", () => {
        cy.visit("http://localhost:4200/");
        cy.get('.p-button-danger > .p-button-label').click();
        cy.get('#emailId').type('kjosephsubash@gmail.com');
        cy.get('.ng-star-inserted > .p-button > .p-button-label').click();
        cy.get('.p-dialog-header-close-icon').click();
        cy.intercept('https://amrita-elective.tk/users/resetPassword',(req) => {
            req.body = {
                "oldPassword": "admin",
                "newPassword": "admin"
            };});
    });
});