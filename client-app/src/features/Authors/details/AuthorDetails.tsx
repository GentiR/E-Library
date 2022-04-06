import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';


export default observer ( function AuthorDetails(){

  const {authorStore} = useStore();
  const {selectedAuthor: author,loadAuthor,loadingInitial} = authorStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if(id) loadAuthor(id);
  }, [id, loadAuthor]);


  if(loadingInitial || !author) return <LoadingComponent/>;
return(
  <Card fluid>
    <Card.Content>
      <Card.Header>{author.name}</Card.Header>
      <Card.Description>
       {author.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group widths='2'>
         <Button as={Link} to={`/manage/${author.id}` } basic color='blue' content='Edit'/>
         <Button as={Link} to={'/authors'} basic color='grey' content='Cancel'/>
     </Button.Group>
    </Card.Content>
  </Card>
)
})