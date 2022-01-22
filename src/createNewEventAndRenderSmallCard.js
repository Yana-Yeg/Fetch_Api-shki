import { refs } from '.';
import smallCard from './templates/smallCard.hbs';

//вынос создания нового объекта для рендера карточки
export default function createNewEventAndRenderSmallCard(_embedded) {
    // console.log(_embedded);
    const newEvent = _embedded.events.map(event => {
    return {
      id: event.id,
      name: event.name,
      localDate: event.dates.start.localDate,
      placeName: event._embedded.venues[0].name,
    //   map: event.seatmap.staticUrl,                 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
    // console.log(newEvent);
    // console.log(document.body.offsetWidth);
    const markup = smallCard(newEvent);
    refs.mainList.innerHTML = markup;
}

