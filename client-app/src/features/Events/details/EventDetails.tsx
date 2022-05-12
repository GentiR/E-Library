import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingConponents";
import { useStore } from "../../../app/stores/store";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedSidebar from "./EventDetailedSideBar";


export default observer (function EventDetails(){
    const {eventStore} = useStore();
    const{selectedEvent: eventt, loadEvent, loadingInitial} = eventStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadEvent(id);
    }, [id, loadEvent]);

    if(loadingInitial || !eventt) return <LoadingComponents/>;
    
    return(
     <Grid>
         <Grid.Column width={10}>
             <EventDetailedHeader eventt={eventt}/>
             <EventDetailedInfo eventt={eventt}/>
             <EventDetailedChat/>
         </Grid.Column>
         <Grid.Column width={6}>
             <EventDetailedSidebar/>
         </Grid.Column>
     </Grid>
    )
})