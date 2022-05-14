import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import { Card, Icon, Image } from 'semantic-ui-react'
import BookList from './BookList';


export default observer( function BookDashboard(){

    const{bookStore} = useStore(); 
    const{loadBooks, bookRegistry} = bookStore; 
    
    useEffect(() => {
        if(bookRegistry.size <= 1) loadBooks();
    //this array ensures that the code runs only one time
    },  [bookRegistry.size, loadBooks])


   if(bookStore.loadingInitial) return <LoadingComponents content='Loading books...' />

    
    return(
        <Grid>
            <Grid.Column width='16'>
              <BookList />
            </Grid.Column>
        </Grid>
    )
})