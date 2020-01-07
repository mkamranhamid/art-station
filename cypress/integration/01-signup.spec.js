describe("Sign in", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="a-signup"]')
            .click()
    })
    it("should go to signup view", () => {
        let randomNumber = Math.round(Math.random() * 100);
        let name = `mkamrranhamid`;
        let uniqueUsername = `${name}+${randomNumber}`;
        let uniqueEmail = `${uniqueUsername}@gmail.com`
        cy.get('#register-email')
            .type(uniqueEmail).should('have.value', uniqueEmail)
        cy.get('#register-pwd')
            .type('123456').should('have.value', '123456')
        cy.get('#register-name')
            .type(name).should('have.value', name)
        cy.get('#register-username')
            .type(uniqueUsername).should('have.value', uniqueUsername)
        cy.get('.dropdown')
            .click()
        cy.get('.dropdown-item').contains('user').click()
        cy.get('[type="submit"]').click()
    })
})