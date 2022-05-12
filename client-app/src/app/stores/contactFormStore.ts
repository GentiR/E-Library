import { IContactForm } from '../models/contactForm'
import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent';


export default class ContactFormStore {
    contactFormRegistry = new Map<string, IContactForm>();
    loadingInitial = false;
    contactForm: IContactForm | null = null;
    submitting = false;
    target = "";

    constructor(){
        makeAutoObservable(this)
     }

get contactFormData() {
    return Array.from(this.contactFormRegistry.values());
  }
  loadContactForm = async () => {
      this.loadingInitial = true;
      try {
          const contactForm = await agent.ContactForms.contactFormList();
         contactForm.forEach(contactForm => {
             contactForm.firstName = contactForm.firstName.split(".")[0];
             this.contactFormRegistry.set(contactForm.id, contactForm);
         });
         this.loadingInitial = false;
      } catch(error){
        console.log(error);
        this.loadingInitial(false);
      }
  }
}