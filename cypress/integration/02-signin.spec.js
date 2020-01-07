describe("Sign in", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })
    it("login with wrong credentials", () => {
        cy.get("#login-email")
            .type('test@test.com').should('have.value', 'test@test.com')
        cy.get("#login-pwd")
            .type('123456').should('have.value', '123456').type('{enter}')
        cy.get(".alert")
            .should('have.attr', 'role', 'alert')
    })
    it("login with email only", () => {
        cy.get("#login-email")
            .type('test@test.com').should('have.value', 'test@test.com').type('{enter}')

    })
    it("login with password only", () => {
        cy.get("#login-pwd")
            .type('123456').should('have.value', '123456').type('{enter}')
    })
})