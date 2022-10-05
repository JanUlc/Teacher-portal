describe('Study buddy app', () => {
    it('Renders unauthenticated app', () => {
        cy.visit('/'); // "/" odwoluje sie do baseURL
        cy.findByText(/login/i).should('exist'); // w cypress zywamy find, a w react testing get
    });
});
