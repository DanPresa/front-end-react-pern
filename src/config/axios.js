import Axios from 'axios';

import { API_URL } from './../constants/api';

const clientAxios = Axios.create({
    baseURL: API_URL
});

export default clientAxios;