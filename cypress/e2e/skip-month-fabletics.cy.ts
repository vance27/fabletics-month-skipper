const myLinks = [
    '8443934671',
    '8443880794',
    '8439118621',
    '8435865442',
    '8432220856',
    '8426134900',
    '8420197762',
    '8301913144',
    '8296981105',
    '8291702722',
    '8238528109',
    '8222483440',
    '8213446273',
    '8212978963',
    '8210460148',
    '8205743437',
    '8170051396',
    '8150497804',
    '8139169174',
    '8135606683',
    '8135380381',
    '8133715642',
    '8130032902',
    '8087015110',
    '8169455203',
    '8063339572',
    '7910806852',
    '7620085492',
    '7609879819',
    '7275793924',
    '6940522963',
    '6839529748',
    '6827259523',
    '6815089168',
    '6807809149',
    '6804203191',
    '6623734996',
    '6623566690',
    '4430257423',
    '4320240772',
    '4317766357',
    '4290167068',
    '4279982428',
    '4272275011',
    '4263079411',
    '4262035387',
    '4261910869',
    '4260398842',
];

describe('@mapmyride-downloader/mmr-empty', () => {
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

        myLinks.forEach(id => {
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
