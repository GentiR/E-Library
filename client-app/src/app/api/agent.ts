import axios, { AxiosResponse } from 'axios';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { Gift } from '../models/gift';
import { Language } from '../models/language';
import { User, UserFormValues } from '../models/user';
import { store } from '../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
     try {
        await sleep(1000);
        return response;
    } 
    catch (error) {
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

const Books = {
    list: () => requests.get<Book[]>('/books'),
    details: (id: string)=> requests.get<Book>(`/books/${id}`),
    create: (book: Book) => axios.post<void>('/books', book),
    update: (book: Book) => axios.put<void>(`/books/${book.id}`, book),
    delete: (id: string) => axios.delete<void>(`/books/${id}`)
}

const Languages = {
    list: () => requests.get<Language[]>('/languages'),
    details: (id: string)=> requests.get<Language>(`/languages/${id}`),
    create: (language: Language) => axios.post<void>('/languages', language),
    update: (language: Language) => axios.put<void>(`/languages/${language.id}`, language),
    delete: (id: string) => axios.delete<void>(`/languages/${id}`)
}

const Gifts = {
    list: () => requests.get<Gift[]>('/gifts'),
    details: (id: string)=> requests.get<Gift>(`/gifts/${id}`),
    create: (book: Gift) => axios.post<void>('/gifts', book),
    update: (book: Gift) => axios.put<void>(`/gifts/${book.id}`, book),
    delete: (id: string) => axios.delete<void>(`/gifts/${id}`)
}

const Account = { 
    current: () => requests .get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    registerUser: (user: UserFormValues) => requests.post<User>('/account/registerUser', user),
    registerAdmin: (user: UserFormValues) => requests.post<User>('/account/registerAdmin', user),
}

const Users = {
    list: () => requests.get<User[]>('/user/all'),
    details: (id: string) => requests.get<User>(`/user/${id}`),
}

    const agent = {
    Authors,
    Books,
    Languages,
    Account,
    Gifts
}
export default agent;