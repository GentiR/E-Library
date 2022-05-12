import { Event } from '../models/event';
import { makeAutoObservable, runInAction} from "mobx";
import agent from '../api/agentEvents';
import {format} from 'date-fns';

export default class EventStore {
    eventRegistry = new Map<string, Event>();
    selectedEvent: Event | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor(){
        makeAutoObservable(this)
    }

    get eventsByDate(){
        return Array.from(this.eventRegistry.values()).sort((a, b) => 
        a.date!.getTime() - b.date!.getTime());
    }
    get groupEvents() {
        return Object.entries(
            this.eventsByDate.reduce((events, eventt) => {
                const date = format(eventt.date!, 'dd MMM yyyy');
                events[date] = events[date] ? [...events[date], eventt] : [eventt];
                return events;
            }, {} as {[key: string]: Event[]})
        )
    }

    loadEvents = async () => {
        this.loadingInitial = true;
        try {
           const events = await agent.Events.list();
              events.forEach(eventt =>  {
                 this.setEvent(eventt);
           } )
           this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    loadEvent = async (id:string) => {
        let eventt = this.getEvent(id);
        if(eventt){
            this.selectedEvent = eventt;
            return eventt;
        } else {
            this.loadingInitial = true;
            try {
                eventt = await agent.Events.details(id);
                this.setEvent(eventt);
                runInAction(() => {
                    this.selectedEvent = eventt;
                })
                this.setLoadingInitial(false);
                return eventt;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    private setEvent = (eventt : Event) =>{
        eventt.date = new Date(eventt.date!);
        this.eventRegistry.set(eventt.id, eventt);
    }
    private getEvent = (id: string) => {
        return this.eventRegistry.get(id);
    } 
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
   
    createEvent = async (eventt: Event) => {
        this.loading = true;
        try{
            await agent.Events.create(eventt);
            runInAction(() => {
                this.eventRegistry.set(eventt.id, eventt);
                this.selectedEvent = eventt;
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
    updateEvent = async (eventt: Event) => {
        this.loading = true;
        try{
            await agent.Events.update(eventt);
            runInAction(() => {
               this.eventRegistry.set(eventt.id, eventt);
               this.selectedEvent = eventt;
               this.editMode = false;
               this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    deleteEvent = async (id: string) => {
        this.loading = true;
        try{
            await agent.Events.delete(id);
            runInAction(() =>{
                this.eventRegistry.delete(id);
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


