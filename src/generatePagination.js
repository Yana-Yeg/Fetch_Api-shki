import paginationMarkup from './pagination';
import {key} from "../config.json";

export default function generatePagination(_links, page) {
    const baseUrl = 'https://app.ticketmaster.com';
    let markup = '';
    let activePage = page.number+1;

    const queryHttp = (Object.values(_links.self).join('').split('&page'))[0];
 
    paginationMarkup(page.totalPages-1, activePage, {link:`${baseUrl}${queryHttp}&apikey=${key}&page=`});
    
  }



