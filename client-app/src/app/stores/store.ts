import { createContext, useContext } from "react";
import AuthorStore from "./authorStore"

import BookStore from "./bookStore";

interface Store{
    bookStore: BookStore,
    authorStore : AuthorStore
}

export const store: Store = {
    bookStore: new BookStore(),
    authorStore: new AuthorStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
