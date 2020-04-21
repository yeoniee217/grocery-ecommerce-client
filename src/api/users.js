import axios from 'axios';

export const checkLoggedIn = async () => {
  const response = await axios.get('http://localhost:3000/logged_in', {withCredentials: true})
                    .catch(error => {
                      console.log('*checkLoggedIn request -', error);
                      return Promise.reject(error);
                    });
  return response.data;
};

export const loginUser = async (user) => {
  const response = await axios.post('http://localhost:3000/login', {user}, {withCredentials: true})
                    .catch(error => {
                      console.log('*login request -', error);
                      return Promise.reject(error);
                    });
  return response.data;
};


export const createUser = async (user) => {
  const response = await axios.post('http://localhost:3000/users', user, {withCredentials: true})
                    .catch(error => {
                      console.log('*createUser request -', error);
                      return Promise.reject(error);
                    });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.delete('http://localhost:3000/logout', {withCredentials: true})
                    .catch(error => {
                      console.log('*logoutUser request -', error);
                      return Promise.reject(error);
                    });
  return response.data;
};
