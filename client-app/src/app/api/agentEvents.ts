//this file contains all the request that goes to api
import { Event } from '../models/event';
import axios, { AxiosResponse } from "axios";

const sleep = (delay: number) => {
    return new Promise((resolve) =>{
        setTimeout(resolve,delay)
    })
}
axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use( async response => {
    try{
    await sleep(1000)
        return response;
    }
    catch(error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests ={
    get: <T>(url: string) => axios.get <T>(url).then(responseBody),
    post: <T>(url: string, body:{}) => axios.post<T>(url,body).then(responseBody),
    put:<T>(url: string , body:{}) => axios.put<T>(url, body).then(responseBody),
    del:<T>(url: string) => axios.delete<T>(url).then(responseBody),
}
const Events = {
    list: () => requests.get<Event[]>('/events'),
    details: (id: string)=> requests.get<Event>(`/events/${id}`),
    create: (eventt: Event) => axios.post<void>('/events', eventt),
    update: (eventt: Event) => axios.put<void>(`/events/${eventt.id}`, ),
    delete: (id: string) => axios.delete<void>(`/events/${id}`)
}

const agent ={
    Events
}

export default agent;
