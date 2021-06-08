// eslint-disable-next-line no-undef
describe("Login", () => {
    it("wrong email for reset password", () => {
        cy.intercept('PUT', 'https://amrita-elective.tk/users/requestReset',
            {
                statusCode: 200,
                body: {
                  status: true,
                  message: 'Reset email sent!'
                }
            }
        ).as('/users/requestReset');
        cy.visit("http://localhost:4200/");
        cy.get('.p-button-danger > .p-button-label').click();
        cy.get('#emailId').type('kjosephsubash@gmail.com');
        cy.get('.ng-star-inserted > .p-button > .p-button-label').click();
        cy.get('.p-dialog-header-close-icon').click();
    });
});
