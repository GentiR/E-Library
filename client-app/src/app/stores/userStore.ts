import { store } from './store';
import { history } from "../..";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserFormValues } from "../models/user";

export default class UserStore {
    userRegistry = new Map<string, User>();
    user: User | null = null;

    constructor() {
        makeAutoObservable(this)
    }

    get userByFirstname(){
        return Array.from(this.userRegistry.values());
    }

    get isLoggedIn() {
        return !!this.user;
    }

    get isAdmin() {
        return this.user?.role === "admin" ? true : false;
    }


    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            const path = user.role.toLowerCase();
            history.push('/index');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        }catch(error){
            console.log(error);
        }
    }

    registerUser = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.registerUser(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/index');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    registerAdmin = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.registerAdmin(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/index');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }
}