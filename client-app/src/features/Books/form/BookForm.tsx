import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import '../../../'
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';



export default observer( function BookForm(){

    const history = useHistory();
    const {bookStore} = useStore();
    const {createBook, updateBook, loading, loadBook, loadingInitial} = bookStore;
    const {id} = useParams<{id: string}>();

    const[book, setBook] = useState({
        id: '',
        bookName:'',
        publicationYear: '',
        publisher:'',
        price: '',
        image:'',
    });

        useEffect(() =>{
            if (id) loadBook(id).then(book => setBook(book!))  
        }, [id, loadBook]);

    function handleSubmit(){
     if  (book.id.length ===0) {
         let newBook  = {
             ...book, 
             id: uuid()
         };
         createBook(newBook).then(() => history.push(`/books/${newBook.id}`));
     }else{
         updateBook(book).then(()=> history.push(`/books/${book.id}`));
     }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ){
        const {name, value } = event.target;
        setBook({...book, [name]: value})
    }
 

    return(
        <Segment clearing>
            <h1>Add a book</h1>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='BookName' value={book.bookName} name='bookName' onChange={handleInputChange}/>
                <Form.Input type='number' placeholder='Publication Year' value={book.publicationYear} name='publicationYear' onChange={handleInputChange}/>
                <Form.Input placeholder='Publisher' value={book.publisher} name='publisher' onChange={handleInputChange}/>
                <Form.Input placeholder='Price' value={book.price} name='price' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={`/books/${book.id}`}  floated='right'  type='button' content='Cancel'/>
             
            </Form>
        </Segment>
    )
})