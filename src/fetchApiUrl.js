import axios from 'axios';
import {key} from "../config.json"

export default async function fetchApiUrl(url) {
  
  try {
   const response = await axios.get(url);
    //  console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}





