import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import card from './templates/card.hbs';
import smallCard from './templates/smallCard.hbs';
import code from './countries.json';


const refs = {
    form: document.querySelector('form'),
    select: document.querySelector('.form-select'),
    smallCards:document.querySelector('.main__grid-small-cards')
  };
 
  
//   refs.form.addEventListener('change', searchEvents);

  console.log(code)
const markup = code.map(el=>`<option value="${el.code}">${el.name}</option>`).join("")
console.log(refs.select)

refs.select.insertAdjacentHTML("beforeend",markup);

  
//   async function searchEventst(event) {
//     event.preventDefault();
//     page = 1;
//     const {
//       elements: { searchQuery },
//     } = event.currentTarget;
    // searchAnimal = searchQuery.value.trim();
// } 

fetchApiGet('eagles', 'US').then(events => {
    console.log(events);
    const markup = smallCard(events);
    refs.smallCards.insertAdjacentHTML('beforeend', markup);
} );

// fetchApiGet('some', 'US').then(events => {
//     console.log(events);
//     const markup = card(events);
    
//     document.body.insertAdjacentHTML('beforeend', markup);
// } );




