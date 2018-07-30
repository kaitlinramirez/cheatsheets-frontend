describe('tower project testing', () => {
  it('should be able to delete a cheetsheet', () => {
    cy.visit('/')
    cy.get('button').eq(0).click()
  })
  it('form should start empty', ()=>{
    cy.get('input').should('be.empty')
    cy.get('textarea').should('be.empty')
  })
  it('should be able to enter a name in the name field', () => {
    cy.get('input').eq(0).type('Name')
  })
  it('should enter snippet in the snippet field', ()=>{
    cy.get('textarea').type('Snippet')
  })
  it('should enter a description in the description field', () => {
    cy.get('input').eq(1).type('Description')
  })
  it('should submit the new cheatsheet', () => {
    cy.contains('Submit').click()
  })
})
