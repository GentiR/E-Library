//this contains all of our requests that go into the api

import axios, { AxiosResponse } from 'axios';
import { Author } from '../models/author';

const sleep = (delay: number) => {
 return new Promise((resolve) => {
     setTimeout(resolve, delay)
})
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
     try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests ={
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put:  <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Authors = {
    list: () => requests.get<Author[]>('/authors'),
    details: (id: string) => requests.get<Author>(`/authors/${id}` ),
    create: (author: Author) => axios.post<void>('/authors', author),
    update: (author: Author) => axios.put<void>(`/authors/${author.id}` , author),
    delete: (id: string) => axios.delete<void>(`/authors/${id}`) 
}
const agent = {
    Authors
}
export default agent;