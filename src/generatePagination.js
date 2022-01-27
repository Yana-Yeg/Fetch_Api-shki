import paginationMarkup from './pagination';
import {key} from "../config.json";

export default function generatePagination(_links, page) {
    const baseUrl = 'https://app.ticketmaster.com';
    let markup = '';
    let activePage = page.number+1;

    // const queryHttp = (Object.values(_links.first).join('').split('&page'))[0];
  
  const queryHttp = (Object.values(_links.self.href).join('').split('&'))[0] + '&' + (Object.values(_links.self.href).join('').split('&'))[2];
  // console.log(queryHttp);
    paginationMarkup(page.totalPages, activePage, {link:`${baseUrl}${queryHttp}&apikey=${key}&page=`});
    
  }



