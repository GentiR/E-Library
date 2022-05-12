import React, { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Author } from '../../../app/models/author';
import {format} from 'date-fns';
import { useStore } from "../../../app/stores/store";

interface Props {
    author: Author
}


export default function AuthorListItem({author}: Props){
    const {authorStore} = useStore();
    const {deleteAuthor, authorsByName, loading} = authorStore;


    const [target, setTarget] = useState('');
    function handleAuthorDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
        setTarget(e.currentTarget.name);
        deleteAuthor(id);
     }
    return(
   <Segment.Group>
<Segment>
    <Item.Group>
        <Item>
            <Item.Image size="tiny" circular src='/assets/user.png'/>
            <Item.Content >
                <Item.Header>
                <Icon name="female"/>   {author.name}
                </Item.Header>
                <Item.Description>
                  {author.surname}
                </Item.Description>  
            </Item.Content>
        </Item>
    </Item.Group>
</Segment>
<Segment>
    <span>
       
        <Icon name="book"/> {author.description}
    </span>
</Segment>
<Segment clearing>
<Button
     name={author.id}
     loading={loading && target === author.id} 
     onClick={(e) => handleAuthorDelete(e, author.id)}
     floated="right" 
     color="red" 
     content='Delete'/>
    <Button as={Link}
    to={ `/authors/${author.id}`}
    color='teal'
    floated="right"
    content='view'
    />
</Segment>
   </Segment.Group>
    )
}