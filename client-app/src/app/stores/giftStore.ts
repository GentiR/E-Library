

import { Gift } from '../models/gift';
import { makeAutoObservable, runInAction} from "mobx";
import agent from '../api/agentGifts';

export default class GiftStore{
    giftRegistry = new Map<string, Gift>();
    selectedGift: Gift | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get giftsByPrice(){
        return Array.from(this.giftRegistry.values()).sort((a, b) =>
         a.giftPrice > b.giftPrice ? -1 : 1 );
    }

    loadGifts = async () => {
        this.loadingInitial = true;
        try{
            const gifts = await agent.Gifts.list();
        
                gifts.forEach(gift => {
                  this.setGift(gift);
                })

                this.setLoadingInitial(false);

        }catch(error){
            console.log(error);

            this.setLoadingInitial(false);
          
        }
    }

   

    loadGift = async (id:string) => {
        let gift = this.getGift(id);
        if(gift){
            this.selectedGift = gift;
            return gift;
        }else {
            this.loadingInitial = true;
            try{
                gift = await agent.Gifts.details(id);
                this.setGift(gift);
                runInAction(()=>{
                    this.selectedGift = gift;
                })
                this.setLoadingInitial(false);
                return gift;
            }catch(error){
                console.log(error);
                this.setLoadingInitial(false);

            }
        }
    }

    private setGift = (gift : Gift) =>{
        this.giftRegistry.set(gift.id,gift);
    }
    

    private getGift = (id: string) => {
        return this.giftRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) =>{
        this.loadingInitial = state;
    }

    createGift = async (gift:Gift) => {
        this.loading = true;
        try{
            await agent.Gifts.create(gift);
            runInAction(() => {
                this.giftRegistry.set(gift.id,gift);
                this.selectedGift = gift;
                this.editMode=false;
                this.loading= false;
            })
        }catch(error){
            console.log(error);
            runInAction(() =>{
                this.loading= false;
            })
        }
    }

    updateGift = async (gift : Gift) =>{
        this.loading=true;
        try{
            await agent.Gifts.update(gift);
            runInAction(()=>{
                this.giftRegistry.set(gift.id,gift)
                this.selectedGift = gift;
                this.editMode=false;
                this.loading = false;
            })


        }catch(error){
            console.log(error)
            runInAction(() =>{
                this.loading = false;
            })
        }

    }

    deleteGift = async (id:string) => {
        this.loading = true;
        try{
            await agent.Gifts.delete(id);
            runInAction(() =>{ 
                this.giftRegistry.delete(id);
            this.loading=false;
            })

        }catch(error){
            console.log(error);
            runInAction(()=>{
                this.loading= false;
            })
        }
    }
}