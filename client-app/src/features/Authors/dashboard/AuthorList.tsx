import { observer } from 'mobx-react-lite';
import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import "./author.css";
import AuthorListItem from './AuthorListItem';


export default observer(function AuthorList(){
    const {authorStore, userStore} = useStore();
    const {deleteAuthor, authorsByName, loading} = authorStore;


    
 return(
     <>
     <Fragment>
         {userStore.isAdmin && <Button as={NavLink} to='/createAuthor' positive content='Add a new author'/>}
        <Header content='Author Details'sub color='teal'></Header>            
        </Fragment>
        {authorsByName.map(author =>(
            <AuthorListItem key={author.id} author={author}/>
        ))} </>
 )
})