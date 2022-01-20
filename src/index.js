import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import card from './templates/card.hbs';
import smallCard from './templates/smallCard.hbs';

fetchApiGet('some', 'US').then(events => {
    console.log(events);
    const markup = smallCard(events);
    document.body.insertAdjacentHTML('beforeend', markup);
} );

// fetchApiGet('some', 'US').then(events => {
//     console.log(events);
//     const markup = card(events);
    
//     document.body.insertAdjacentHTML('beforeend', markup);
// } );


