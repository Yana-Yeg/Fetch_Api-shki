import fetchApiUrl from './fetchApiUrl';
import generatePagination from './generatePagination';
import createNewEventAndRenderSmallCard from './createNewEventAndRenderSmallCard';

export default function onClickEvent(e) {
  if (e.target.nodeName !== 'A') return;
  if (e.target.classList.contains('activePage')) {
    e.preventDefault();
    return;
  }
      e.preventDefault();
      fetchApiUrl(e.target.href).then(({page, _embedded, _links}) => {
          createNewEventAndRenderSmallCard(_embedded);
          generatePagination(_links, page); 
      });
    }



