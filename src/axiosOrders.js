import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-3f8af-default-rtdb.firebaseio.com/'
});

export default instance;