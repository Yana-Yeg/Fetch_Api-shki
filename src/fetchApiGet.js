import axios from 'axios';
import {key} from "../config.json"

export default async function fetchApiGet(query, country, page) {
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
  };

  try {
   const response = await axios.get(
    `${BASE_URL}/discovery/v2/events.json?apikey=${API_KEY}&page=${page}`,
      createParams(filterParams),
    );
     console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}





