//Stores API calls(requests to the server) for categories resource.
import axios from 'axios';

//Promise Error Handling Reference
export const getCategories = async () => {
  //axios.get returns a Promise
  // return axios.get("http://localhost:3000/categories.json");

  const response = await axios.get("http://localhost:3000/categories.json").catch(error => {
                      console.log('*getCategories request -', error);
                      return Promise.reject(error);
                    });
  return response.data;

  // // diff way(than the above) to handle get request error with promise rejection(Promise.reject())
  // return axios.get("http://localhost:3000/categories.json")
  //         .then(response => {
  //           console.log('The response to *getCategories request', response);
  //           return response.data;
  //         })
  //         .catch(error => {
  //           console.log('*getCategories request -', error);
  //           return Promise.reject(error);
  //         });
};

