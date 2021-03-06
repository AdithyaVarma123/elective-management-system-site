// eslint-disable-next-line no-undef
describe("Electives", () => {
    it("should add elective", () => {
        cy.visit("http://localhost:4200/");
        cy.get('#email').type('kjosephsubash@gmail.com');
        cy.get('#password').type('admin');
        cy.get(':nth-child(3) > .ng-valid > .p-radiobutton > .p-radiobutton-box > .p-radiobutton-icon').click({force:true});
        cy.get('.float-right > .p-button-label').click();
        cy.get(':nth-child(2) > .p-menuitem-link > .p-menuitem-text',{timeout:10000}).click();
        cy.get('#p-tabpanel-1-label > .p-tabview-title',{timeout:10000}).click();
        cy.get('#ename',{timeout:10000}).type('test');
        cy.get('#courseCode').type('testa');
        cy.get('#desc').type('some test');
        cy.get('#version').type('1');
        cy.get('#strength').type('50');
        cy.get('#batches0').type('2018-4-BTECH-CSE');
        cy.get(':nth-child(14) > .p-col-10 > .p-inputtext').type('teacher_1');
        cy.get('#attributes0\\ key').type('abc');
        cy.get('#attributes0\\ value').type('cde');
        cy.get('[label="Add elective"] > .p-button-label').click();
    });
});