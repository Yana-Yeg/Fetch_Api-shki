import axios from 'axios';
import { key } from "../config.json"

export default async function fetchApiByGroupId(id) {
  const BASE_URL = 'https://app.ticketmaster.com';
  const API_KEY = key;

  try {
    const response = await axios.get(
      `${BASE_URL}/discovery/v2/classifications/${id}.json?apikey=${API_KEY}`,
    );
     console.log(response.data);
    return [response.data];
  } catch (error) {
    console.error(error);
  }
}
