import { refs } from '.';
import fetchApiById from './fetchApiById';
import { showModal } from './renderModal';

export default function fetchNewEvents(id) {
    fetchApiById(id).then(data => {
        const newEvents = data.map(event => {
            // events.classifications[0].segment.name
            // console.log('eve', event)
            return {
                id: event.id,
                url: event.url,
                name: event.name,
                info: event.info? event.info : "More info will be soon",
                // info: {
                //     segment: event.classifications[0].segment.name,
                //     genre: event.classifications[0].genre.name
                // },
                localDate: event.dates.start.localDate ? event.dates.start.localDate : "",
                localTime: event.dates.start.localTime ? `${event.dates.start.localTime}`.slice(0, 5) : "",
                timezone: event.dates.timezone ? event.dates.timezone : "",
                location: {
                    latitude: event._embedded.venues[0].location.latitude,
                    longitude: event._embedded.venues[0].location.longitude,
                },
                // priceRanges: event.priceRanges ? event.priceRanges : "More info will be soon",
                priceRangeType: event.priceRanges && event.priceRanges[0].type || "",
                priceRangeMin : event.priceRanges && event.priceRanges[0].min || "",
                priceRangeMax : event.priceRanges && event.priceRanges[0].max || "no info",
                priceRangeCurrency : event.priceRanges && event.priceRanges[0].currency || "",
                // priceRangeType: event.priceRanges ? event.priceRanges[0].type : "",
                // priceRangeMin : event.priceRanges ? event.priceRanges[0].min : "",
                // priceRangeMax : event.priceRanges ? event.priceRanges[0].max : "",
                // priceRangeCurrency : event.priceRanges ? event.priceRanges[0].currency : "",
                placeName: event._embedded.venues[0].name,
                cityName: event._embedded.venues[0].city.name? event._embedded.venues[0].city.name : "More info will be soon",
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
          showModal(...newEvents);
        refs.closeModalBtn.addEventListener('click', e => {
            refs.backdrop.classList.add('is-hidden');
    
        });
        refs.backdrop.addEventListener('click', e => {
            if (e.target.dataset.modal === '') refs.backdrop.classList.add('is-hidden')
        })

        
})



}
    