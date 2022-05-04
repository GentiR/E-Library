import { createContext, useContext } from "react";
import AuthorStore from "./authorStore"
import BookStore from "./bookStore";
import GiftStore from './giftStore';

interface Store{
    bookStore: BookStore,
    authorStore : AuthorStore
    giftStore : GiftStore
}

export const store: Store = {
    bookStore: new BookStore(),
    authorStore: new AuthorStore(),
    giftStore : new GiftStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
