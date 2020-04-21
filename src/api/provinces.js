//Stores API calls(requests to the server) for provinces resource.
import axios from 'axios';

export const getProvinces = async () => {
  const response = await axios.get("http://localhost:3000/provinces.json").catch(error => {
                      console.log('*getProvinces request -', error);
                      return Promise.reject(error);
                    });
  return response.data;
}
