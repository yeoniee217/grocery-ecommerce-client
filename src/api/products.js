//Stores API calls(requests) for products resource.
import axios from 'axios';

export const getProductsByCategory = async (categoryID, filter) => {
  let response = await axios.get(`http://localhost:3000/categories/${categoryID}/products${filter}.json`);
  return response.data;
  
  // return axios.get(`http://localhost:3000/categories/${categoryID}/products${filter}.json`)
  //         .then(response => {
  //           console.log(response);
  //           return response.data;
  //         }).catch(error => {
  //           console.log('There has been a problem with your *getProductsByCategory request: ' + error.message);
  //         });
};

export const searchProducts = async (formData) => {
  let response = await axios.post(`http://localhost:3000/search.json`, formData);
  return response.data;

  // return axios.post(`http://localhost:3000/search.json`, formData)
  //         .then(response => {
  //           console.log(response);
  //           return response.data;
  //         }).catch(error => {
  //           console.log('There has been a problem with your *searchProducts request: ' + error.message);
  //         });
};
