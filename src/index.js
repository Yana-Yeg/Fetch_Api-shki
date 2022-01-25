import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import fetchApiById from './fetchApiById';
import fetchApiUrl from './fetchApiUrl';
import fetchNewEvents from './newArrayAndGetModal';
import smallCard from './templates/smallCard.hbs';
import code from './countries.json';
import paginationMarkup from './pagination';
import { showModal } from './renderModal';
import generatePagination from './generatePagination';
import createNewEventAndRenderSmallCard from './createNewEventAndRenderSmallCard';
import onClickEvent from './onClickEvent';
import { key } from '../config.json';
import 'animate.css';
import './skroll-up';
import './modalFooter';
import * as goodBad from './goodBad';
import Choices from 'choices.js';

document.querySelector('.header__logo-icon').addEventListener('click', e => {
  location.reload();
});

export const refs = {
  form: document.querySelector('.form'),
  input: document.querySelector('input.form-element'),
  //   select: document.querySelector('.form-select'),
  mainList: document.querySelector('.main__grid-small-cards'),
  pagination: document.querySelector('.pagination'),
  more: document.querySelector('.infoauthor-button'),
  badRequest: document.querySelector('.bad-request'),
  goodRequest: document.querySelector('.good-request'),
};


    const element = document.querySelector('.form-select');

    const markup3 = code.map(el => `<option value="${el.code}">${el.name}</option>`).join("");
    element.insertAdjacentHTML("beforeend", markup3);
    
    const choices = new Choices(element, {
    // items: code,
    // addItemFilter: value => {
    searchEnabled: true,
});





//отрисовка страницы при первой загрузке
let nowPage;
// const markup2 = code.map(el => `<option value="${el.code}">${el.name}</option>`).join("")

// console.log(refs.select);
// refs.select.insertAdjacentHTML("beforeend", markup2);

function openPage() {
  nowPage = 1;
  fetchApiGet('eagles', 'US', nowPage).then(({ page, _embedded, _links }) => {
    //вынос создания нового объекта для рендера карточки
    createNewEventAndRenderSmallCard(_embedded);
    // отрисовка нумерации страниц
    generatePagination(_links, page);

    refs.pagination.addEventListener('click', onClickEvent);
  });
}
openPage();

//выбор данных из формы
refs.form.addEventListener('change', searchEvents);
function searchEvents(event) {
  event.preventDefault();
  nowPage = 1;

  // const selectedQuery = refs.form.elements.search.value.trim();
  const selectedQuery = refs.input.value.trim();
  const selectedCountry = element.value;
  console.log(element.value);

  
  
  if (selectedQuery && selectedCountry) {
    fetchApiGet(selectedQuery, selectedCountry, nowPage)
      .then(({ page, _embedded, _links }) => {
        //вынос создания нового объекта для рендера карточки
        goodBad.good();
        createNewEventAndRenderSmallCard(_embedded);
        generatePagination(_links, page);

        refs.pagination.addEventListener('click', onClickEvent);
      })
      .catch(error => {
        goodBad.bad();
      });
  }
  if (selectedQuery && !selectedCountry) {
    fetchApiGet(selectedQuery, 'US', nowPage)
      .then(({ page, _embedded, _links }) => {
        //вынос создания нового объекта для рендера карточки
        goodBad.good();
        createNewEventAndRenderSmallCard(_embedded);
        generatePagination(_links, page);

        refs.pagination.addEventListener('click', onClickEvent);
      })
      .catch(error => {
        goodBad.bad();
      });
  }
  if (!selectedQuery && selectedCountry) {
    fetchApiGet('', selectedCountry, nowPage)
      .then(({ page, _embedded, _links }) => {
        //вынос создания нового объекта для рендера карточки
        goodBad.good();
        createNewEventAndRenderSmallCard(_embedded);
        generatePagination(_links, page);

        refs.pagination.addEventListener('click', onClickEvent);
      })
      .catch(error => {
        goodBad.bad();
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
