import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer( function BookList(){
    const{bookStore} = useStore();
    const {deleteBook, booksByYear, loading} = bookStore;
    const [target, setTarget] = useState('');

    function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBook(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {booksByYear.map(book => (
                    <Item key={book.id}>
                        <Item.Content>
                            <Item.Header as='a'> {book.bookName}</Item.Header>
                            <Item.Description>
                                <div>{book.publicationYear}</div>
                                <div>{book.publisher}</div>
                            </Item.Description>

                            <Item.Extra>
                            
                                <Button as={Link} to={`/books/${book.id}`} floated='right' content='View' color='blue'/>
                                <Button
                                    name = {book.id}
                                    loading={loading && target=== book.id} 
                                    onClick={(e) => handleBookDelete(e, book.id)}
                                    floated='right' 
                                    content='Delete' 
                                    color='red'
                                  />
                            
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})