//とりあえず動いてるか
describe('Cypress', () => {
  it('が動いてるか', () => {
    expect(true).to.equal(true)
  })
  it('login',()=>{
    cy.visit('http://localhost:3000/login')
    cy.get('[type="email"]').type('sotatake7716@gmail.com').should('have.value','sotatake7716@gmail.com')

  })
})