import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid, GridColumn, List, ListItem} from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import EventFilters from './EventFilters';
import EventList from './EventList';

export default observer (function EventDasboard() {
    const {eventStore} = useStore();
    const{loadEvents, eventRegistry} = eventStore;

    useEffect(() => {
        if(eventRegistry.size <= 1) loadEvents();
    }, [eventRegistry.size, loadEvents])

    if(eventStore.loadingInitial) return <LoadingComponents content='Loading app'/>
    return(
       <Grid>
           <Grid.Column width='8'>
             <EventList/>
           </Grid.Column>
           <GridColumn width='6'>
              <EventFilters/>
           </GridColumn>
       </Grid>
    )
})