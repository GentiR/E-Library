import { createContext, useContext } from "react";
import AuthorStore from "./authorStore"
import BookStore from "./bookStore";
import GiftStore from './giftStore';
import commonStore from "./commonStore";
import ModalStore from "./modalStore";
import UserStore from "./userStore";
import EventStore from "./eventStore";

interface Store{
    bookStore: BookStore,
    authorStore : AuthorStore
    giftStore : GiftStore
    commonStore : commonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

interface Store{
    bookStore: BookStore,
    authorStore : AuthorStore,
    eventStore: EventStore
}

export const store: Store = {
    bookStore: new BookStore(),
    authorStore: new AuthorStore(),
    giftStore : new GiftStore(),
    commonStore: new commonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    eventStore: new EventStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
