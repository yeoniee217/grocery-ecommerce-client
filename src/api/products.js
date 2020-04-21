//Stores API calls(requests to the server) for products resource.
import axios from 'axios';

// Errors from API calls(requests) have to be handled here by returning a rejected promise object.
// so when using Promise.all() in a component file,
// a single returned promise from Promise.all() will reject the first promise that rejects
export const getProductsByCategory = async (categoryID, filter) => {
  const response = await axios.get(`http://localhost:3000/categories/${categoryID}/products${filter}.json`).catch(error => {
                    console.log('*getProductsByCategory request -', error);
                    return Promise.reject(error);
                  });
  return response.data;

  // return axios.get(`http://localhost:3000/categories/${categoryID}/products${filter}.json`)
  //         .then(response => {
  //           console.log(response);
  //           return response.data;
  //         }).catch(error => {
  //           console.log('There has been a problem with your *getProductsByCategory request: ' + error.message);
  //         });
};

export const searchProducts = async (queryParams) => {
  const response = await axios.get(`http://localhost:3000/search.json`, queryParams).catch(error => {
                    console.log('*searchProducts request -', error);
                    return Promise.reject(error);
                  });
  return response.data;
};

// export const searchProducts = async (formData) => {
//   const response = await axios.post(`http://localhost:3000/search.json`, formData).catch(error => {
//                     console.log('*searchProducts request -', error);
//                     return Promise.reject(error);
//                   });
//   return response.data;

//   // return axios.post(`http://localhost:3000/search.json`, formData)
//   //         .then(response => {
//   //           console.log(response);
//   //           return response.data;
//   //         }).catch(error => {
//   //           console.log('There has been a problem with your *searchProducts request: ' + error.message);
//   //         });
// };
