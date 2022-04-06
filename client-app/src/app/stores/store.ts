import { createContext, useContext } from "react";
import AuthorStore from "./authorStore"

interface Store{
   authorStore : AuthorStore
}

export const store: Store ={
    authorStore: new AuthorStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}