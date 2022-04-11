import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import BookList from './BookList';


export default observer( function BookDashboard(){

    const{bookStore} = useStore(); 
    const{loadBooks, bookRegistry} = bookStore; 
    
    useEffect(() => {
        if(bookRegistry.size <= 1) loadBooks();
    //this array ensures that the code runs only one time
    },  [bookRegistry.size, loadBooks])


   if(bookStore.loadingInitial) return <LoadingComponents content='Loading app' />

    
    return(
        <Grid>
            <Grid.Column width='10'>
              <BookList />
            </Grid.Column>

            <Grid.Column width='6'>
              <h2>Book Filters</h2>
            </Grid.Column>
        </Grid>
    )
})