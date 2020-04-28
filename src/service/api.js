import Axios from 'axios';

// eslint-disable-next-line no-unused-vars
const api = Axios.create({baseURL: 'https://rocketseat-node.herokuapp.com/api'});

export default api