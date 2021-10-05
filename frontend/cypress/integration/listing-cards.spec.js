// describe('Listing Cardsd', () => {

//     beforeEach(() => {
//         cy.request('GET', '/api/cards/')
//         .its('body')
//         .each(todo => cy.request('DELETE', `/api/cards/${card.id}`))
//     })
//     it('Shows cards from the server', () => {
//       const sushiPlace = 'Sushi Place';
//       const pizzaPlace = 'Pizza Place';
    
//       cy.request({
//         method: 'POST',
//         url: 'https://outside-in-dev-api.herokuapp.com/YOUR-API-KEY/restaurants',
//         body: [
//           {id: 1, name: sushiPlace},
//           {id: 2, name: pizzaPlace},
//         ],
//       });
  
//       cy.visit('/');
//       cy.contains(sushiPlace);
//       cy.contains(pizzaPlace);
//     });
//   });
  