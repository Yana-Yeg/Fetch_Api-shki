import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import fetchApiById from './fetchApiById';
import card from './templates/card.hbs';
import smallCard from './templates/smallCard.hbs';
import code from './countries.json';
import { showModal } from './renderModal';
import createNewEventAndRenderSmallCard from './createNewEventAndRenderSmallCard'
import './modal'


export const refs = {
  form: document.querySelector('form'),
  select: document.querySelector('.form-select'),
  mainList: document.querySelector('.main__grid-small-cards'),
};

//отрисовка страницы при первой загрузке
let page;
const markup = code.map(el => `<option value="${el.code}">${el.name}</option>`).join("")
console.log(refs.select);
refs.select.innerHTML = markup;

function openPage(){
  page = 1;
  fetchApiGet('Star','US', page).then(({page, _embedded}) => {
      console.log(_embedded.events);
    //вынос создания нового объекта для рендера карточки
    createNewEventAndRenderSmallCard(_embedded);
      
      console.log(page.totalPages);

});

}
openPage();

//выбор данных из формы
refs.form.addEventListener('change', searchEvents);
function searchEvents(event) {
    event.preventDefault();
    page = 1;

    const selectedQuery = refs.form.elements.search.value.trim();
    const selectedCountry = refs.select.value;
    
    if (selectedQuery && selectedCountry) {
        fetchApiGet(selectedQuery, selectedCountry, page).then(({ page, _embedded }) => {
            //вынос создания нового объекта для рендера карточки
            createNewEventAndRenderSmallCard(_embedded);
        })
    }
    if (selectedQuery && !selectedCountry) {
        fetchApiGet(selectedQuery, 'US', page).then(({ page, _embedded }) => {
            //вынос создания нового объекта для рендера карточки
            createNewEventAndRenderSmallCard(_embedded);
        });
    }
    if (!selectedQuery && selectedCountry) {
        fetchApiGet('', selectedCountry, page).then(({ page, _embedded }) => {
            //вынос создания нового объекта для рендера карточки
            createNewEventAndRenderSmallCard(_embedded);
        });
    }
}







//переделка нового объпкта и по клику вызов карточки для модалки
// refs.mainList.addEventListener('click', onClick);
// function onClick(e) {
//     // e.preventDefault();
//     if (e.target.nodeName !== 'IMG') return;
//     console.log(e.target.dataset.id);
//     const id = e.target.dataset.id;
//     fetchApiById(id).then(data => {
//         showModal(...data)
//          refs.closeModalBtn.addEventListener('click', e => {
//             refs.modal.classList.toggle('is-hidden');
//   });
//         const newEvents = data.map(event => {
//             return {
//                 id: event.id,
//                 url: event.url,
//                 name: event.name,
//                 info: event.info,
//                 localDate: event.dates.start.localDate,
//                 localTime: event.dates.start.localTime,
//                 timezone: event.dates.timezone,
//                 priceRanges: event.priceRanges,
//                 placeName: event._embedded.venues[0].name,
//                 cityName: event._embedded.venues[0].city.name,
//                 countryName: event._embedded.venues[0].country.name,
//                 image: event.images.find(img => {
//                     if (document.body.offsetWidth <= 480) {
//                         return img.url.includes("ARTIST_PAGE")
//                     }
//                     if (document.body.offsetWidth < 1280 && document.body.offsetWidth > 480) {
//                         return img.url.includes("RETINA_PORTRAIT_16_9")
//                     }
//                     if (document.body.offsetWidth >= 1280) {
//                         return img.url.includes("TABLET_LANDSCAPE_3_2")
//                     }
//                 }),
//             };
//         });
//         // console.log('new',newEvents);
//         // const markup = card(newEvents);
//         // refs.mainList.innerHTML = markup;
        
        
//     })
// }

