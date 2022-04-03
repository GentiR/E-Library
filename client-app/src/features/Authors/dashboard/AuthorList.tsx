import React from "react";
import { Button, Item,  Segment } from "semantic-ui-react";
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
                       <Item.Header as='a'>{author.name} {author.surname}</Item.Header>
                       <Item.Description>
                           <div>{author.description}</div>
                           </Item.Description>
                       <Item.Extra>
                           <Button floated="right" color="blue" content='Edit'/>
                           <Button floated="right" color="red" content='Delete'/>
                       </Item.Extra>
                   </Item.Content>
               </Item>
           ))}
      </Item.Group>
     </Segment>
 )
    
}