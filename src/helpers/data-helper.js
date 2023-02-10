import axios from 'axios';
import { v4 as uuid } from 'uuid';
const baseURL = 'http://localhost:4000/';

export const getData = (collection, params = {}) => {
    return axios.get(baseURL+collection, { params });
};

export const postData = (collection, body) => {
    if (!body) throw new Error('Missing body');
    body.id = uuid();
    return axios.post(baseURL+collection, body);
};


export const patchData = (collection, body) => {
    if (!body) throw new Error('Missing body');
    return axios.patch(`${baseURL}${collection}/${body.id}`, body);
};

export const deleteData = (collection, id) => {
    if (!id) throw new Error('Missing id');
    return axios.delete(`${baseURL}${collection}/${id}`);
};
