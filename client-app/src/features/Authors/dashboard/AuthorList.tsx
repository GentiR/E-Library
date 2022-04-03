import React from "react";
import { Button, ButtonGroup, Item, ItemContent, ItemDescription, ItemHeader, Segment } from "semantic-ui-react";
import { Author } from "../../../app/models/author";

interface Props{
    authors: Author[];
}

export default function AuthorList({authors}: Props){
 return(
     <Segment>
      <Item.Group divided>
           {authors.map(author =>(
               <Item key={author.id}>
                   <Item.Content>
                       <ItemHeader as='a'>{author.name}</ItemHeader>
                       <ItemContent>{author.surname}</ItemContent>
                       <ItemDescription>{author.description}</ItemDescription>
                       <ButtonGroup>
                           <Button basic color="blue" content='Edit'/>
                           <Button basic color="red" content='Delete'/>
                       </ButtonGroup>
                   </Item.Content>
               </Item>
           ))}
      </Item.Group>
     </Segment>
 )
    
}