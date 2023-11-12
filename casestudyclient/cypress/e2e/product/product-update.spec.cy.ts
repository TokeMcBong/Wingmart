describe('product update test', () => {
  it('visits the product page and updates an product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'products').click();
    cy.contains('1001').click();
    cy.get('input[formcontrolname=id').click({ force: true });
    cy.get('input[formcontrolname=name')
      .click({ force: true })
      .type('Test Watch 2.0');
    cy.get('input[formcontrolname=msrp').click({ force: true }).type('29.99');
    cy.get('input[formcontrolname=costprice')
      .click({ force: true })
      .type('18.99');
    cy.get('.mat-expansion-indicator').eq(0).click();
    cy.get('.mat-expansion-indicator').eq(1).click();
    cy.get('input[formcontrolname=rop').click({ force: true }).type('12');
    cy.get('input[formcontrolname=eoq').click({ force: true }).type('11');
    cy.get('input[formcontrolname=qoh').click({ force: true }).type('14');
    cy.get('input[formcontrolname=qoo').click({ force: true }).type('15');
    cy.contains('updated!');
  });
});
