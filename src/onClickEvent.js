import fetchApiUrl from './fetchApiUrl';
import generatePagination from './generatePagination';
import createNewEventAndRenderSmallCard from './createNewEventAndRenderSmallCard';

export default async function onClickEvent(e) {
  if (e.target.nodeName !== 'A') return;
  if (e.target.classList.contains('activePage')) {
    e.preventDefault();
    return;
  }
      e.preventDefault();
      const result = await fetchApiUrl(e.target.href)
      createNewEventAndRenderSmallCard(result._embedded);
      generatePagination(result._links, result.page); 

    }



