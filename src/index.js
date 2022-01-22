import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import fetchApiById from './fetchApiById';
import card from './templates/card.hbs';
import smallCard from './templates/smallCard.hbs';
import code from './countries.json';
import { showModal } from './renderModal';

export const refs = {
  form: document.querySelector('form'),
  select: document.querySelector('.form-select'),
    mainList: document.querySelector('.main__grid-small-cards'),
};

//   refs.form.addEventListener('change', searchEvents);

const markup = code.map(el => `<option value="${el.code}">${el.name}</option>`).join('');

refs.select.insertAdjacentHTML('beforeend', markup);

//   async function searchEventst(event) {
//     event.preventDefault();
//     page = 1;
//     const {
//       elements: { searchQuery },
//     } = event.currentTarget;
// searchAnimal = searchQuery.value.trim();
// }

fetchApiGet('star', 'US').then(events => {
  console.log(events);
  const newEvent = events.map(event => {
    return {
      id: event.id,
      name: event.name,
      localDate: event.dates.start.localDate,
      placeName: event._embedded.venues[0].name,
      map: event.seatmap.staticUrl,
      image: event.images.find(img => {
            if (document.body.offsetWidth <= 480) {
                return img.url.includes("EVENT_DETAIL_PAGE")
            } 
            if (document.body.offsetWidth < 1280 && document.body.offsetWidth > 480) {
                return img.url.includes("TABLET_LANDSCAPE_16_9")
            }
            if (document.body.offsetWidth >= 1280) {
                return img.url.includes("TABLET_LANDSCAPE_16_9")
            }
        }),
    };
  });
    console.log(newEvent);
    console.log(document.body.offsetWidth);
    const markup = smallCard(newEvent);
    refs.mainList.insertAdjacentHTML('beforeend', markup);
});


refs.mainList.addEventListener('click', onClick);
function onClick(e) {
    // e.preventDefault();
    if (e.target.nodeName !== 'IMG') return;
    console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    fetchApiById(id).then(data => {
        console.log('data', ...data);
        showModal(...data)
         refs.closeModalBtn.addEventListener('click', e => {
            refs.modal.classList.toggle('is-hidden');
  });
        const newEvents = data.map(event => {
            return {
                id: event.id,
                url: event.url,
                name: event.name,
                info: event.info,
                localDate: event.dates.start.localDate,
                localTime: event.dates.start.localTime,
                timezone: event.dates.timezone,
                priceRanges: event.priceRanges,
                placeName: event._embedded.venues[0].name,
                cityName: event._embedded.venues[0].city.name,
                countryName: event._embedded.venues[0].country.name,
                image: event.images.find(img => {
                    if (document.body.offsetWidth <= 480) {
                        return img.url.includes("ARTIST_PAGE")
                    }
                    if (document.body.offsetWidth < 1280 && document.body.offsetWidth > 480) {
                        return img.url.includes("RETINA_PORTRAIT_16_9")
                    }
                    if (document.body.offsetWidth >= 1280) {
                        return img.url.includes("TABLET_LANDSCAPE_3_2")
                    }
                }),
            };
        });
        console.log('new',newEvents);
        const markup = card(newEvents);
        refs.mainList.innerHTML = markup;
        
        
    })
}

import './modal'