import { refs } from '.';
import fetchApiById from './fetchApiById';
import { showModal } from './renderModal';



export default function fetchNewEvents(id) {
    fetchApiById(id).then(data => {
        showModal(...data);
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
        // console.log('new',newEvents);
        // const markup = card(newEvents);
        // refs.mainList.innerHTML = markup;
        
        
})



}
    