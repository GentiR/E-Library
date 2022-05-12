
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid} from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import AuthorList from './AuthorList';


export default observer ( function AuthorDashboard(){
    
    const {authorStore} = useStore();
    const {loadAuthors, authorRegistry} = authorStore;

    useEffect(() => {
        if(authorRegistry.size <= 1) loadAuthors();
    },  [authorRegistry.size, loadAuthors])
  
   
   
  
if(authorStore.loadingInitial) return <LoadingComponents content='Loading authors...' />
if(authorStore.loadingInitial) return <LoadingComponents content='Loading app' />
    return(

        
        <Grid>
            <Grid.Column width='6' >
            <AuthorList  />
            </Grid.Column>
            
        </Grid>
    )
})
