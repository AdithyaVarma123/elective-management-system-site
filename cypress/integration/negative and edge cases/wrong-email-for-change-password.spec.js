// eslint-disable-next-line no-undef
describe("Login", () => {
    it("wrong email for reset password", () => {
        cy.visit("http://localhost:4200/");
        cy.get('.p-button-danger > .p-button-label').click();
        cy.get('#emailId').type('adithyapv2k@gmail.com');
        cy.get('.ng-star-inserted > .p-button > .p-button-label').click();
        cy.get('.p-dialog-header-close-icon').click();
        cy.intercept('https://amrita-elective.tk/users/resetPassword',(req) => {
            req.body = {
                "oldPassword": "admin",
                "newPassword": "admin"
            };});
    });
});