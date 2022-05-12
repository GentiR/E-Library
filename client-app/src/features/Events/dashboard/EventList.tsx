import { group } from "console";
import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

import { Button, Header} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import EventListItem from "./EventListItem";


export default observer(function EventList(){
    const {eventStore} = useStore();
    const {groupEvents} = eventStore;
   
    return(
        <>
         <Button as={NavLink} to='/createEvent' positive content='Create Event' />
        {groupEvents.map(([group, events]) => (
           <Fragment key={group}>
            <Header sub color="teal">
                {group}
            </Header>
          {events.map(eventt => (
           <EventListItem key={eventt.id} eventt={eventt} />
          )) }
           </Fragment> 
        ))}</>
    
    )
})