import axios from 'axios';
import {key} from "../config.json"



export default async function fetchApiGet(query, country = 'UA') {
  const BASE_URL= "https://app.ticketmaster.com"
  const API_KEY = key
  const createParams = params => {
    return {
      params,
    };
  };


  const filterParams = {
    keyword: query,
    countryCode: country,
    
    //  page,
  };

  try {
   const response = await axios.get(
    `${BASE_URL}/discovery/v2/events.json?apikey=${API_KEY}`,
      createParams(filterParams),
    );
     console.log('res', response.data._embedded.events);
    return response.data._embedded.events;
  } catch (error) {
    console.error(error);
  }
}





