import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Author } from "../models/author";

export default class AuthorStore{
 authorRegistry = new Map<string, Author>();
 selectedAuthor: Author | undefined = undefined;
 editMode = false;
 loading = false;
 loadingInitial = true;

    constructor(){
       makeAutoObservable(this)
    }
    get authorsByName(){
       return Array.from(this.authorRegistry.values()).sort((a, b) => a.name.localeCompare(b.name));
    }

    loadAuthors = async () =>{
        this.loadingInitial = true;
        try{
            const authors = await agent.Authors.list();
                authors.forEach(author => {
                this.setAuthor(author);
        })
        this.setLoadingInitial(false);
            
        }catch(error){
            console.log(error);
         this.setLoadingInitial(false);
        }
    }
    loadAuthor = async (id: string) =>{
        let author = this.getAuthor(id);
        if(author){
            this.selectedAuthor = author;
            return author;
        }else{
            this.loadingInitial = true;
            try {
                author = await agent.Authors.details(id);
                this.setAuthor(author);
                runInAction(() => {
                    this.selectedAuthor = author;
                })
                
                this.setLoadingInitial(false);
                return author;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setAuthor = (author: Author) =>
    {
         author.name = author.name;
                this.authorRegistry.set(author.id, author);
    }

    private getAuthor = (id: string)=>{
        return this.authorRegistry.get(id);
    }

setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
}


createAuthor = async (author: Author) => {
    this.loading = true;
    try{
       await agent.Authors.create(author);
       runInAction(() => {
           this.authorRegistry.set(author.id, author);
           this.selectedAuthor = author;
           this.editMode = false;
           this.loading = false;
       })
    }catch (error){
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
}
updateAuthor = async (author: Author) => {
    this.loading = true;
    try{
        await agent.Authors.update(author);
        runInAction(() => {
          this.authorRegistry.set(author.id, author);
          this.selectedAuthor = author;
          this.editMode = false;
          this.loading = false;
        })
    }catch(error){
      console.log(error);
      runInAction(() => {
          this.loading = false;
      })
    }

}
deleteAuthor = async (id: string) => {
    this.loading = true;
    try{
        await agent.Authors.delete(id);
        runInAction(() =>{
            this.authorRegistry.delete(id);
            this.loading = false;
        })
    }catch(error){
        console.log(error);
        runInAction(() => {
            this.loading = false;
        })
    }
}

}