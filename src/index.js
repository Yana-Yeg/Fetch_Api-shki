import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import fetchApiById from './fetchApiById';
import fetchApiUrl from './fetchApiUrl';
import card from './templates/card.hbs';
import smallCard from './templates/smallCard.hbs';
import code from './countries.json';
import paginationMarkup from './pagination';
import { showModal } from './renderModal';
import createNewEventAndRenderSmallCard from './createNewEventAndRenderSmallCard';
import fetchNewEvents from './newArrayAndGetModal';
import './modal';
import {key} from "../config.json";
import 'animate.css';
import './skroll-up';



export const refs = {
  form: document.querySelector('form'),
  select: document.querySelector('.form-select'),
  mainList: document.querySelector('.main__grid-small-cards'),
  pagination: document.querySelector('.pagination')
};

//отрисовка страницы при первой загрузке
let page;
const markup = code.map(el => `<option value="${el.code}">${el.name}</option>`).join("")

// console.log(refs.select);
refs.select.insertAdjacentHTML("beforeend", markup);


function openPage(){
  page = 1;
  fetchApiGet('Star','US', page).then(({page, _embedded, _links}) => {
    //вынос создания нового объекта для рендера карточки
    createNewEventAndRenderSmallCard(_embedded);
    generatePagination(_links, page);

    function generatePagination(_links, page) {
        const baseUrl = 'https://app.ticketmaster.com';
        let markup = '';
        let activePage = 1;
        if (_links.prev !== null) {
          markup += `<a href="${baseUrl}${_links.prev}">&lArr;</a>`;
          activePage = parseInt((Object.values(_links.prev)).join('').split('=')[3]) + 1;
        //   console.log(page.totalPages)
        }
        for (let i = 1; i <=page.totalPages; i++) {
          markup += `<a class="${
            activePage === i ? 'active' : ''
          } " href="${baseUrl}/discovery/v2/events.json?apikey=${key}&page=${i}">${i}</a>`;
        }
      
        if (_links.next !== null) {
          markup += `<a href="${baseUrl}${_links.next}">&rArr;</a>`;
        }
        refs.pagination.innerHTML = markup;
      }
      document.addEventListener('click', onClickEvent);
 
    function onClickEvent(e) {
        if (e.target.nodeName !== 'A') return;
        e.preventDefault();
        console.log(e.target.href)
        fetchApiUrl(e.target.href).then(({page, _embedded, _links}) => {
            createNewEventAndRenderSmallCard(_embedded);
            generatePagination(_links, page); 
        });
      }
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

