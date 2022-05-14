import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import MySelectInput from '../../app/common/form/MySelectInput';
import { useStore } from '../../app/stores/store';
import {v4 as uuid} from 'uuid';


export default observer( function LanguageForm() {

    const history = useHistory();
    const {languageStore} = useStore();
    const {createLanguage, updateLanguage, loading, loadLanguage, loadingInitial} = languageStore;
    const {id} = useParams<{id: string}>();

    const[language, setLanguage] = useState({
        id: '',
        languageName:'',
    });

        useEffect(() =>{
            if (id) loadLanguage(id).then(language => setLanguage(language!))  
        }, [id, loadLanguage]);

    function handleSubmit(){
     if  (language.id.length ===0) {
         let newLanguage  = {
             ...language, 
             id: uuid()
         };
         createLanguage(newLanguage).then(() => history.push(`/languages/${newLanguage.id}`));
     }else{
        updateLanguage(language).then(()=> history.push(`/languages/${language.id}`));
     }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ){
        const {name, value } = event.target;
        setLanguage({...language, [name]: value})
    }
 

    return(
        <Segment clearing>
            <h1>Add a language</h1>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='LanguageName' value={language.languageName} name='languageName' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={`/languages/${language.id}`}  floated='right' type='button' content='Cancel'/>    
            </Form>
        </Segment>
    )
})


