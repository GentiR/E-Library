import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingConponents';
import { Author } from '../../../app/models/author';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';






export default observer( function AuthorForm() {
const history = useNavigate();
    const {authorStore} = useStore();
    const {selectedAuthor, createAuthor, updateAuthor, loading, loadAuthor, loadingInitial } = authorStore;
    const {id} = useParams<{id: string}> ();
    const[author, setAuthor] = useState({
        id: '',
        name: '',
        surname: '',
        description: ''
    });

    useEffect(() => {
        if (id) loadAuthor(id).then(author => setAuthor(author!)) 
    }, [id, loadAuthor]);
   
    function handleSubmit(){
        if (author.id.length === 0){
        let newAuthor = {
            ...author,
            id: uuid()
        };
        createAuthor(newAuthor).then(() => history(`/authors/${newAuthor.id}`))
        }else{
            updateAuthor(author).then(() => history(`/authors/${author.id}`))
        }
    }
    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
       const{name, value} = event.target;
       setAuthor({...author,[name]: value})
    }
    if(loadingInitial) return <LoadingComponent content='Loading author...'/>
    return(
        <Segment clearing>
         <Form onSubmit={handleSubmit} autoComplete='off'>
             <Form.Input placeholder='Name' value={author.name} name='name' onChange={handleInputChange}/>
             <Form.Input placeholder='Surname' value={author.surname} name='surname' onChange={handleInputChange}/>
             <Form.TextArea placeholder='Description' value={author.description} name='description' onChange={handleInputChange}/>
             <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
             <Button as={Link} to='/authors' floated='right' type='button' content='Cancel'/>
         </Form>
        </Segment>
    )
})

function loadAuthor(id: string) {
    throw new Error('Function not implemented.');
}
