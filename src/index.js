import './sass/main.scss';
import fetchApiGet from './fetchApiGet';
import fetchNewEvents from './newArrayAndGetModal';
import code from './countries.json';
import generatePagination from './generatePagination';
import createNewEventAndRenderSmallCard from './createNewEventAndRenderSmallCard';
import onClickEvent from './onClickEvent';
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
  mainList: document.querySelector('.main__grid-small-cards'),
  pagination: document.querySelector('.pagination'),
  more: document.querySelector('.infoauthor-button'),
  badRequest: document.querySelector('.bad-request'),
  goodRequest: document.querySelector('.good-request'),
};


//library for select
const element = document.querySelector('.form-select');
const markup3 = code.map(el => `<option value="${el.code}">${el.name}</option>`).join("");
element.insertAdjacentHTML("beforeend", markup3);
const choices = new Choices(element, {
searchEnabled: true,
});


// page markup after 1 loading
let nowPage;

async function openPage() {
  nowPage = 0;
  const result = await fetchApiGet('eagles', 'US', nowPage)
    createNewEventAndRenderSmallCard(result._embedded);
    generatePagination(result._links, result.page);

    refs.pagination.addEventListener('click', onClickEvent);
}
openPage();

//output values from form
refs.form.addEventListener('change', searchEvents);
async function searchEvents(event) {
  // event.preventDefault();
  nowPage = 0;
  console.log(element.value);

  const selectedQuery = refs.input.value.trim();
  let selectedCountry = element.value;
  // console.log(refs.input);

  if (selectedQuery && selectedCountry) {
    try {
      const result = await fetchApiGet(selectedQuery, selectedCountry, nowPage)
        goodBad.good();
        createNewEventAndRenderSmallCard(result._embedded);
        generatePagination(result._links, result.page);

        refs.pagination.addEventListener('click', onClickEvent);

    } catch(error) {
        goodBad.bad();
      };
  }
  if (selectedQuery && !selectedCountry) {
    try {
      const result = await fetchApiGet(selectedQuery, 'US', nowPage)
        goodBad.good();
        createNewEventAndRenderSmallCard(result._embedded);
        generatePagination(result._links, result.page);

        refs.pagination.addEventListener('click', onClickEvent);
      }
      catch(error) {
        goodBad.bad();
      };
  }
  if (!selectedQuery && selectedCountry) {
    try {
      const result = await fetchApiGet('', selectedCountry, nowPage)
        goodBad.good();
         createNewEventAndRenderSmallCard(result._embedded);
        generatePagination(result._links, result.page);

        refs.pagination.addEventListener('click', onClickEvent);
      }
      catch(error) {
        goodBad.bad();
      };
  }
}

//rebuild income object for modal
refs.mainList.addEventListener('click', onClick);
function onClick(e) {
  // e.preventDefault();
  if (e.target.nodeName !== 'IMG') return;
  const id = e.target.dataset.id;
  fetchNewEvents(id);
}


export default searchEvents;