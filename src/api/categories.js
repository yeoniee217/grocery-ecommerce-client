//Stores API calls for categories resource.
import axios from 'axios';

export const getCategories = async () => {
  //axios.get returns a Promise?
  let response = await axios.get("http://localhost:3000/categories.json");
  return response.data;
  
  // return axios.get("http://localhost:3000/categories.json")
  //         .then(response => {
  //           console.log(response);
  //           return response.data;
  //         }).catch(error => {
  //           console.log('There has been a problem with your *getCategories request: ' + error.message);
  //         });
};

