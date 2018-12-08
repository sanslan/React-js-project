import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://reading.loc/api',
    headers: {
        'content-type': 'multipart/form-data',
    }
});

export default instance ;