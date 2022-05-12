import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Event } from '../../../app/models/event';
import {format} from 'date-fns';

interface Props {
    eventt: Event
}

export default function ActivityListItem({eventt}: Props){

    return(
   <Segment.Group>
<Segment>
    <Item.Group>
        <Item>
            <Item.Image size="tiny" circular src='/assets/user.png'/>
            <Item.Content>
                <Item.Header as={Link} to={`/events/${eventt.id}`}>
                    {eventt.title}
                </Item.Header>
             <Item.Description>Hosted by Blerina</Item.Description>   
            </Item.Content>
        </Item>
    </Item.Group>
</Segment>
<Segment>
    <span>
        <Icon name="clock"/> {format(eventt.date!, 'dd MM yyyy h:mm aa')}
        <Icon name="marker"/> {eventt.venue}
    </span>
</Segment>
<Segment secondary>
Attendees go here
</Segment>
<Segment clearing>
    <span>{eventt.description}</span>
    <Button as={Link}
    to={ `/events/${eventt.id}`}
    color='teal'
    floated="right"
    content='view'
    />
</Segment>
   </Segment.Group>
    )
}