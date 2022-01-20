import axios from 'axios';

export default async function fetchApiGet(query, country = 'UA') {
  const BASE_URL = 'https://app.ticketmaster.com';
  const API_KEY = '84oDYCywC5wCFv79gMGAXxLVAXljD9uH';
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
    //  console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
