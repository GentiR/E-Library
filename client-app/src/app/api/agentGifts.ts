import { Gift } from "../models/gift";
import axios, {AxiosResponse} from "axios";

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
const Gifts = {
    list: () => requests.get<Gift[]>('/gifts'),
    details: (id: string)=> requests.get<Gift>(`/gifts/${id}`),
    create: (book: Gift) => axios.post<void>('/gifts', book),
    update: (book: Gift) => axios.put<void>(`/gifts/${book.id}`, book),
    delete: (id: string) => axios.delete<void>(`/gifts/${id}`)
}

const agent ={
    Gifts
}

export default agent;
