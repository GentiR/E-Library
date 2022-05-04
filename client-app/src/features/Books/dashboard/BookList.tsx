import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Card, Icon, Image } from 'semantic-ui-react';
import foto from '../../../Foto/Harryy.png';




export default observer( function BookList(){
    const{bookStore} = useStore();
    const {deleteBook, booksByYear, loading} = bookStore;
    const [target, setTarget] = useState('');

    function handleBookDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
        setTarget(e.currentTarget.name);
        deleteBook(id);
    }


   
        // <Segment>
        //     <Item.Group divided>
        //         {booksByYear.map(book => (
        //             <Item key={book.id}>
        //                 <Item.Content>
        //                     <Item.Header as='a'> {book.bookName}</Item.Header>
        //                     <Item.Description>
        //                         <div>{book.publicationYear}</div>
        //                         <div>{book.publisher}</div>
        //                     </Item.Description>

        //                     <Item.Extra>
                            
        //                         <Button as={Link} to={`/books/${book.id}`} floated='right' content='View' color='blue'/>
        //                         <Button
        //                             name = {book.id}
        //                             loading={loading && target=== book.id} 
        //                             onClick={(e) => handleBookDelete(e, book.id)}
        //                             floated='right' 
        //                             content='Delete' 
        //                             color='red'
        //                           />
                            
        //                     </Item.Extra>
        //                 </Item.Content>
        //             </Item>
        //         ))}
        //     </Item.Group>
        // </Segment>
        
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
                    <Button
                     name = {book.id} 
                     loading={loading && target=== book.id} 
                     onClick={(e) => handleBookDelete(e, book.id)} 
                     color='red'
                     content='Delete'
                     floated='right' />
                     
                     
                    </Card.Content>
                </Card>
             ))}
             
        </Card.Group>
    )
})