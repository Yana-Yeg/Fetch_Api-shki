import { refs } from '.';
import smallCard from './templates/smallCard.hbs';

//вынос создания нового объекта для рендера карточки
export default function createNewEventAndRenderSmallCard(_embedded) {
  const newEvent = _embedded.events.map(event => {
    const location = {
      latitude: event._embedded.venues[0].location ? event._embedded.venues[0].location.latitude :0,
      longitude: event._embedded.venues[0].location ? event._embedded.venues[0].location.longitude :0,
    };

    const renderHref = `http://maps.google.com/maps?q=${location.latitude},${location.longitude}&ll=${location.latitude},${location.longitude}&z=17`

    return {
      id: event.id,
      name: event.name,
      localDate: event.dates.start.localDate,
      placeName: event._embedded.venues[0].name? event._embedded.venues[0].name: "place will be soon",
      map: renderHref,                 
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

    const markup = smallCard(newEvent);
    // console.log(refs.mainList)
  refs.mainList.innerHTML = markup;
  
  
}

