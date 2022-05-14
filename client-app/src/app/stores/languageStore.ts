import { Language } from './../models/language';
import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";

export default class LanguageStore{
 languageRegistry = new Map<string, Language>();
 selectedLanguage: Language | undefined = undefined;
 editMode = false;
 loading = false;
 loadingInitial = true;

    constructor(){
       makeAutoObservable(this)
    }
    get languageByName(){
       return Array.from(this.languageRegistry.values()).sort((a, b) => a.languageName.localeCompare(b.languageName));
    }

    loadLanguages = async () =>{
        this.loadingInitial = true;
        try{
            const languages = await agent.Languages.list();
            languages.forEach(language => {
                this.setLanguage(language);
        })
        this.setLoadingInitial(false);
            
        }catch(error){
            console.log(error);
         this.setLoadingInitial(false);
        }
    }
    loadLanguage = async (id: string) =>{
        let language = this.getLanguage(id);
        if(language){
            this.selectedLanguage = language;
            return language;
        }else{
            this.loadingInitial = true;
            try {
                language = await agent.Languages.details(id);
                this.setLanguage(language);
                runInAction(() => {
                    this.selectedLanguage = language;
                })
                
                this.setLoadingInitial(false);
                return language;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setLanguage = (language: Language) =>
    {
        language.languageName = language.languageName;
                this.languageRegistry.set(language.id, language);
    }

    private getLanguage = (id: string)=>{
        return this.languageRegistry.get(id);
    }

setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
}


createLanguage = async (language: Language) => {
    this.loading = true;
    try{
       await agent.Languages.create(language);
       runInAction(() => {
           this.languageRegistry.set(language.id, language);
           this.selectedLanguage = language;
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
updateLanguage = async (language: Language) => {
    this.loading = true;
    try{
        await agent.Languages.update(language);
        runInAction(() => {
          this.languageRegistry.set(language.id, language);
          this.selectedLanguage = language;
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
deleteLanguage = async (id: string) => {
    this.loading = true;
    try{
        await agent.Languages.delete(id);
        runInAction(() =>{
            this.languageRegistry.delete(id);
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