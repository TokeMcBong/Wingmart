describe('product add test', () => {
  it('visits the product page and adds an product', () => {
    cy.visit('/');
    cy.get('button').click();
    cy.contains('a', 'products').click();
    cy.contains('control_point').click();
    cy.get('input[formcontrolname=id').click({ force: true }).type('1001');
    cy.get('mat-select[formcontrolname="vendorid"]').click();
    cy.get('mat-option').contains('McCormick').click({ force: true });
    cy.get('input[formcontrolname=name')
      .click({ force: true })
      .type('Test Watch');
    cy.get('input[formcontrolname=msrp').click({ force: true }).type('19.99');
    cy.get('input[formcontrolname=costprice')
      .click({ force: true })
      .type('13.99');
    cy.get('.mat-expansion-indicator').eq(0).click();
    cy.get('.mat-expansion-indicator').eq(1).click();
    cy.get('input[formcontrolname=rop').click({ force: true }).type('10');
    cy.get('input[formcontrolname=eoq').click({ force: true }).type('10');
    cy.get('input[formcontrolname=qoh').click({ force: true }).type('11');
    cy.get('input[formcontrolname=qoo').click({ force: true }).type('12');
    cy.get('button').contains('Save').click({ force: true });
    cy.contains('updated!');
  });
});
