import { refs } from '.';
import fetchApiById from './fetchApiById';
import { showModal } from './renderModal';



export default function fetchNewEvents(id) {
    fetchApiById(id).then(data => {
        const newEvents = data.map(event => {
            // events.classifications[0].segment.name
            console.log('eve', event)
            return {
                id: event.id,
                url: event.url,
                name: event.name,
                info: event.info? event.info : "More info will be soon",
                // info: {
                //     segment: event.classifications[0].segment.name,
                //     genre: event.classifications[0].genre.name
                // },
                localDate: event.dates.start.localDate,
                localTime: event.dates.start.localTime,
                timezone: event.dates.timezone,
                location: {
                    latitude: event._embedded.venues[0].location.latitude,
                    longitude: event._embedded.venues[0].location.longitude,
                },
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
          showModal(...newEvents);
        refs.closeModalBtn.addEventListener('click', e => {
        refs.backdrop.classList.toggle('is-hidden');
        });

        // const markup = card(newEvents);
        // refs.mainList.innerHTML = markup;
        
        
})



}
    