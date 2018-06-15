import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export {getUsers};

function getUsers () {
  const url = `${BASE_URL}/users`;
  return axios.get(url).then(res => res.data);
}
