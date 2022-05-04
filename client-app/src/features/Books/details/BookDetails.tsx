import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import foto from '../../../Foto/Harryy.png';

export default observer( function BookDetails(){
  const {bookStore}= useStore();
  const {selectedBook : book, loadBook, loadingInitial} = bookStore;
  const {id} = useParams<{id: string}>();

  useEffect(() =>{
     if(id) loadBook(id);
  }, [id, loadBook]);

  if(loadingInitial || !book) return <LoadingComponents/>

    return(
      <div className='detailsContainer'>
        <Card  fluid>
      <Image   src={foto}/>
        <Card.Content>
          <Card.Header>{book.bookName}</Card.Header>
          <Card.Meta>
            <span > {book.publicationYear}</span>
          </Card.Meta>
          <Card.Description>
            {book.publisher}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button.Group widths='2'>
                <Button as={Link} to={`/manage/book/${book.id}`}  basic color='blue' content='Edit'/>
                <Button as={Link} to={`/books`} basic color='grey' content='Cancel'/>
            </Button.Group>
        </Card.Content>
      </Card>
      </div>
    )
})