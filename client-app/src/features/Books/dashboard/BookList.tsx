import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Card, Icon, Image } from 'semantic-ui-react';
import foto from '../../../Foto/Harryy.png';




export default observer( function BookList(){
    const{bookStore, userStore} = useStore();
    const {deleteBook, booksByYear, loading} = bookStore;
    const {userByFirstname} = userStore;
    const [target, setTarget] = useState('');

    function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBook(id);
    }
        return (    
        <Card.Group >
            {booksByYear.map(book =>(
                <Card className='bookList' key={book.id}>
                     <Image src={foto} wrapped ui={false} />
                    <Card.Content>
                        <Card.Header >{book.bookName}</Card.Header>
                        <Card.Meta>{book.publicationYear}</Card.Meta>
                        <Card.Meta>{book.publisher}</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                         <b>
                             {book.price} Euro
                         </b>
                         
                    </Card.Content>
                    <Card.Content>
                    <Button as={Link} to={`/books/${book.id}`} floated='right' content='View' color='blue'/>
                    {userStore.isAdmin &&
                    <Button
                     name = {book.id} 
                     loading={loading && target=== book.id} 
                     onClick={(e) => handleBookDelete(e, book.id)} 
                     color='red'
                     content='Delete'
                     floated='right' /> 
                    }
                    </Card.Content>
                </Card>
             ))}
             
        </Card.Group>
    )
})