import { createContext, useContext } from "react";
import AuthorStore from "./authorStore"
import BookStore from "./bookStore";
import GiftStore from './giftStore';
import commonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";

interface Store{
    bookStore: BookStore,
    authorStore : AuthorStore
    giftStore : GiftStore
    commonStore : commonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    bookStore: new BookStore(),
    authorStore: new AuthorStore(),
    giftStore : new GiftStore(),
    commonStore: new commonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
