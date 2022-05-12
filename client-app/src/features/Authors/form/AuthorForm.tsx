import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingConponents';
import { Author } from '../../../app/models/author';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { Formik, Form} from "formik";




export default observer( function AuthorForm() {
const history = useHistory();
    const {authorStore} = useStore();
    const { createAuthor, updateAuthor, loading, loadAuthor, loadingInitial } = authorStore;
    const {id} = useParams<{id: string}> ();

    const[author, setAuthor] = useState<Author>({
        id: '',
        name: '',
        surname: '',
        description: ''
    });
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required'),
        surname: Yup.string().required('Surname is Required'),
        description: Yup.string().required('The event description is Required')
    })

    useEffect(() => {
        if (id) loadAuthor(id).then(author => setAuthor(author!)) 
    }, [id, loadAuthor]);
   
    function handleFormSubmit(author: Author){
        if (author.id.length === 0){
        let newAuthor = {
            ...author,
            id: uuid()
        };
        createAuthor(newAuthor).then(() => history.push(`/authors/${newAuthor.id}`));
        }else{
            updateAuthor(author).then(() => history.push(`/authors/${author.id}`));
        }
    }
  
    return(
        <Segment clearing>
         <Header content='Author Details' sub color="teal"/>
         <Formik
         validationSchema={validationSchema} 
         enableReinitialize
         initialValues={author} 
         onSubmit={values => handleFormSubmit(values)}>
           {({handleSubmit, isValid, isSubmitting, dirty}) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput name="name" placeholder="Name"/>
            <MyTextInput name="surname" placeholder="Surname"/>
             <MyTextArea rows={3} placeholder='Description' name='description'/>
             <Button 
             disabled={isSubmitting || !dirty || !isValid}
             loading={loading} floated="right" positive type="submit" content='Submit'/>
             <Button  as={Link} to={`/authors/`} floated="right"  type="button" content='Cancel'/>
         </Form>
           )}
         </Formik>
        </Segment>
    )
})


