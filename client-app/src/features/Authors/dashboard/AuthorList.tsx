import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer(function AuthorList(){
    const {authorStore} = useStore();
    const {deleteAuthor, authorsByName, loading} = authorStore;


    const [target, setTarget] = useState('');

    function handleAuthorDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
       setTarget(e.currentTarget.name);
       deleteAuthor(id);
    }
    
 return(
     <Segment>
     <Item.Group divided>
           {authorsByName.map(author =>(
               <Item key={author.id}>
                   <Item.Content>
                       <Item.Header as='a'>{author.name} {author.surname}</Item.Header>
                       <Item.Description>
                           <div>{author.description}</div>
                           </Item.Description>
                       <Item.Extra>
                           <Button as={Link} to={`/manage/author/${author.id}` } floated="right" color="blue" content='View'/>
                           <Button


                           name={author.id}
                           loading={loading && target === author.id} 
                           onClick={(e) => handleAuthorDelete(e, author.id)}
                           floated="right" 
                           color="red" 
                           content='Delete'/>
                       </Item.Extra>
                   </Item.Content>
               </Item>
           ))}
      </Item.Group>
     </Segment>
 )
    
})