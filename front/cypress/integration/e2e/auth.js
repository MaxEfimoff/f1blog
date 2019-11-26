function emailGenerator() {
  const date = new Date().toISOString();
  const email = date.replace(/:/g, '') + '@' + 'ya.ru'

  return email;
}

const email = emailGenerator();

describe('Smoke test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  })

  it ('should test login', () => {
    cy.get('[data-cy="login"]')
      .should('have.text', 'Войти')
      .click()
    
    cy.get('[data-cy="formData.email"')
      .type('efimovmax@gmail.com')
      .should('have.value', 'efimovmax@gmail.com')

    cy.get('[data-cy="formData.password"')
      .type('111111')
      .should('have.value', '111111')

    cy.get('[data-cy="enter"]')
      .click()

    cy.get('[data-cy="logout"]')
      .click()
  })

  it ('should test reset password', () => {
    cy.get('[data-cy="login"]')
      .should('have.text', 'Войти')
      .click()
    
    cy.get('[data-cy="forgotPassword"]')
      .should('have.text', 'Забыли пароль?')
      .click()

    cy.get('[data-cy="resetPasswordEmail"]')
      .type('efimovmax@gmail.com')
      .should('have.value', 'efimovmax@gmail.com')

    cy.get('[data-cy="submitFormData"]')
      .should('have.text', 'Восстановить пароль')
      .click()
  })

  it ('should test registration', () => {

    cy.get('[data-cy="register"]')
      .should('have.text', 'Зарегистрироваться')
      .click()
    
    cy.get('[data-cy="formData.name"')
      .type('aaaaaa')
      .should('have.value', 'aaaaaa')

    cy.get('[data-cy="formData.email"')
      .type(email)

    cy.get('[data-cy="formData.password"]')
      .type('111111')
      .should('have.value', '111111')

    cy.get('[data-cy="formData.password2"]')
      .type('111111')
      .should('have.value', '111111')

    cy.get('[data-cy="submitFormData"]')
      .click()
  })
})