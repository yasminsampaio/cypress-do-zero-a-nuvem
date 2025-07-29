Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Fulano',
    lastName: 'Detal',
    email: 'emailteste@gmail.com',
    text: 'Teste teste'
}) => {
    cy.get("#firstName").type(data.firstName)
    cy.get("#lastName").type(data.lastName)
    cy.get("#email").type(data.email)
    cy.get("#open-text-area").type(data.text)
    cy.get(".button").click()
})