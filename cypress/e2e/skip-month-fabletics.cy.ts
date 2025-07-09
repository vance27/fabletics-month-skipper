describe.skip('@mapmyride-downloader/mmr-empty', () => {
    beforeEach(() =>
        cy.visit('https://www.mapmyride.com/workouts/dashboard/lifetime')
    );

    it('should display welcome message', () => {
        // Custom command example, see `../support/commands.ts` file
        // TODO secrets
        const email = '';
        const password = '';
        cy.login(email, password);
        cy.wait(5000);

        [].forEach(id => {
            console.log('Custom command example: Download', id);
            cy.visit(`https://www.mapmyride.com/workout/${id}`);
            cy.wait(500);
            const ellipsis = cy.get('.jss381 > .MuiButtonBase-root');
            ellipsis.click();
            //   cy.get('[href="/workout/export/8443934671/tcx"] > span');
            cy.get(`[href="/workout/export/${id}/tcx"] > span`).click();
            //   const newUrl = `https://www.mapmyride.com/workout/export/${id}/tcx`;
            //   cy.visit(newUrl);
            cy.wait(500);
        });
    });
});

describe('fabletics skip the month', () => {
    // beforeEach(() => cy.visit('https://fabletics.com'));

    it('should login and skip the month', () => {
        cy.loginToFabletics(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
    });
});
