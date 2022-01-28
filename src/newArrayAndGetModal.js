import { refs } from '.';
import fetchApiById from './fetchApiById';
import { showModal } from './renderModal';

export default async function fetchNewEvents(id) {
    const dataFromFetchById = await fetchApiById(id)
    const newEvents = dataFromFetchById.map(event => {
            return {
                id: event.id,
                url: event.url,
                name: event.name,
                info: event.info? event.info : "More info will be soon, if you would like to know right now, please press our button 'MORE FROM THIS EVENTS' you will be searching in Google.",
                localDate: event.dates.start.localDate ? event.dates.start.localDate : "",
                localTime: event.dates.start.localTime ? `${event.dates.start.localTime}`.slice(0, 5) : "",
                timezone: event.dates.timezone ? event.dates.timezone : "",
                location: {
                    latitude: event._embedded.venues[0].location ? event._embedded.venues[0].location.latitude : 0,
                    longitude: event._embedded.venues[0].location ? event._embedded.venues[0].location.longitude : 0
                },
                priceRangeType: event.priceRanges && event.priceRanges[0].type || "",
                priceRangeMin : event.priceRanges && event.priceRanges[0].min || "",
                priceRangeMax : event.priceRanges && event.priceRanges[0].max || "no info",
                priceRangeCurrency : event.priceRanges && event.priceRanges[0].currency || "",
                placeName: event._embedded.venues[0].name,
                cityName: event._embedded.venues[0].city.name? event._embedded.venues[0].city.name : "More info will be soon",
                countryName: event._embedded.venues[0].country.name,
                image: event.images.find(img => {
                    if (document.body.offsetWidth <= 480) {
                        return img.url.includes("ARTIST_PAGE")
                    }
                    if (document.body.offsetWidth < 1280 && document.body.offsetWidth > 480) {
                        return img.url.includes("RETINA_PORTRAIT_3_2")
                    }
                    if (document.body.offsetWidth >= 1280) {
                        return img.url.includes("RETINA_LANDSCAPE")
                    }
                }),
            };
        });
        showModal(...newEvents);
        refs.closeModalBtn.addEventListener('click', e => {
            refs.backdrop.classList.add('is-hidden');
        });
        
        refs.backdrop.addEventListener('click', e => {
            if (e.target.dataset.modal === '') refs.backdrop.classList.add('is-hidden')
        })
        
}
    