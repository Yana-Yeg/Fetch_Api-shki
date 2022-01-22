// import axios from 'axios';
// import { showModal } from './renderModal';
// import { showPreloader } from './prealoder';
// import {key} from '../config.json'



// export async function getEventDetails(id) {
//   const preloadNode = await showPreloader();
//   const response = await axios.get(
//     `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${key}`,
//   );
//   preloadNode.remove();
//   if (response.status >= 200 && response.status < 300) {
//     return response.data;
//   }
//   throw new Error(
//     alert(
//       'К сожалению, по Вашему запросу событий не найдено. Попробуйте изменить запрос.',
//     ),
//   );
// }


// document.querySelector('.main__grid-small-cards').addEventListener('click', async e => {
//   e.preventDefault();



    
    
//   const id = e.target.closest('.smallCard-small').id
//   const data = await getEventDetails(id);

    
    
//   const refs = {
//     form: document.querySelector('form'),
//     select: document.querySelector('.form-select'),
//     mainList: document.querySelector('.main__grid-small-cards'),
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('[data-modal]'),
//   };
// console.log('ref',refs.closeModalBtn)

//     refs.closeModalBtn.addEventListener('click', e => {
//     refs.modal.classList.toggle('is-hidden');
//   });
// });



