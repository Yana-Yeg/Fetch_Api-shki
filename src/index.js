import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import fetchApiById from './fetchApiById';
import fetchNewEvents from './newArrayAndGetModal';
import fetchApiByGroupId from './fetchApiByGroupId';
import card from './templates/card.hbs';
import smallCard from './templates/smallCard.hbs';
import code from './countries.json';
import { showModal } from './renderModal';
import createNewEventAndRenderSmallCard from './createNewEventAndRenderSmallCard';
import './modal'


export const refs = {
  form: document.querySelector('form'),
  select: document.querySelector('.form-select'),
  mainList: document.querySelector('.main__grid-small-cards'),
  more: document.querySelector('.infoauthor-button')
};

//отрисовка страницы при первой загрузке
let page;
const markup = code.map(el => `<option value="${el.code}">${el.name}</option>`).join("")
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
refs.mainList.addEventListener('click', onClick);
function onClick(e) {
    // e.preventDefault();
    if (e.target.nodeName !== 'IMG') return;
    // console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    fetchNewEvents(id);
}

// refs.more.addEventListener('click', getInfoByAuthor);
//         function getInfoByAuthor(e) {
//             console.log(e.target.dataset.id);
//             const id = e.target.dataset.id;
//             fetchApiByGroupId(id);
//         }