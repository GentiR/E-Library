import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid}  from 'uuid';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';



export default observer( function BookForm(){

    const navigate = useNavigate();
    const {bookStore} = useStore();
    const {createBook, updateBook, loading, loadBook, loadingInitial} = bookStore;
    const {id} = useParams<{id: string}>();

    const[book, setBook] = useState({
        id: '',
        bookName:'',
        publicationYear: '',
        publisher:''
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
         createBook(newBook).then(() => navigate(`/books/${newBook.id}`));
     }else{
         updateBook(book).then(()=> navigate(`/books/${book.id}`));
     }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ){
        const {name, value } = event.target;
        setBook({...book, [name]: value})
    }

    if(loadingInitial) return <LoadingComponents content='Loading book...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='BookName' value={book.bookName} name='bookName' onChange={handleInputChange}/>
                <Form.Input type='number' placeholder='Publication Year' value={book.publicationYear} name='publicationYear' onChange={handleInputChange}/>
                <Form.Input placeholder='Publisher' value={book.publisher} name='publisher' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={`/books/${book.id}`}  floated='right'  type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
})