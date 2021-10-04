describe('Smoke Test', () => {
    it('can view the home page', () => {
      cy.visit('/');
      cy.contains('Add New List');
      cy.visit('/login/');
      cy.contains('Login');

    });
  });
  