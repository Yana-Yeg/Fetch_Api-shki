import { refs } from '.';
import symbolDevs from './images/symbol-defs.svg';
import sprite from './images/sprite.svg';



export const showModal = events => {
  let priceRange = '';
  let priceRangeMin = '';
  let priceRangeMax = '';
  let priceRangeCurrency = '';
    if (events.priceRanges) {
    priceRange = events.priceRanges[0].type;
    priceRangeMin = events.priceRanges[0].min;
    priceRangeMax = events.priceRanges[0].max;
    priceRangeCurrency = events.priceRanges[0].currency;
  }

// console.log('test', events)
    
  const markupOneModal = `<div class="cards__backdrop" data-modal>
    <div class="modal">
        <button class="close-button" data-modal-close>
            <svg class="modal__icon" width="29" height="19.33">
                <use href="${symbolDevs}#icon-close"></use>
            </svg>
        </button>
        <img id =${events.id} src="${events.image.url}" alt="small-logo" class="modal__small-logo">
        <div class="modal__list-position">
            <div style= 'background-image: url("${events.image.url}");' class="modal__card-poster"></div>
            <div class="modal__list-width">
                <ul>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">INFO</h3>
                        <p class="modal__item-text scroll" id = ${events.id}>${events.info}</p>
                    </li>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">WHEN</h3>
                        <p class="modal__item-text" id = ${events.id}>${events.localDate} <br>${events.localTime} ${events.timezone}</p>
                    </li>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">WHERE</h3>
                        <a class="modal__item-text" target="_blank" href="http://maps.google.com/maps?q=${events.location.latitude},${events.location.longitude}&ll=${events.location.latitude},${events.location.longitude}&z=17" id = ${events.id}> <svg class="modal__icon" width="29" height="19">
              <use href="${sprite}#icon-location" style="fill:#000"></use>
          </svg> ${events.countryName} <br>${events.placeName}</a>
                    </li>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">WHO</h3>
                        <p class="modal__item-text" id = ${events.id}>${events.name}</p>
                    </li>
                    <li class="modal__list-info">
                    <h3 class="modal__item-title">PRICES</h3>
                        <ul>
                            <li>
                                <p class="modal__price-text" id=${events.id}>
                                    <span>
                                        <svg class="modal__icon-code" width="29" height="19.33">
                                            <use href="${symbolDevs}#icon-ticket1"></use>
                                        </svg>
                                    </span>
                                    ${priceRange} ${priceRangeMin} - ${priceRangeMax}  ${priceRangeCurrency}
                                </p>
                                <a href="${events.url}" target="_blank" class="modal__list-btn">BUY TICKETS</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <button type="button" data-id="${events.groupId}" class="button infoauthor-button">MORE FROM THIS EVENTS</button>
    </div>`;

    document.querySelector('#modalNode').innerHTML = markupOneModal;
    refs.closeModalBtn = document.querySelector('.close-button');
    refs.modal = document.querySelector('.modal');
    refs.backdrop = document.querySelector('.cards__backdrop');
    refs.more = document.querySelector('.infoauthor-button');


    refs.more.addEventListener('click', getInfoByAuthor);
    function getInfoByAuthor(e) {
            e.preventDefault;
            

        }
};

