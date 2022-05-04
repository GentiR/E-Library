import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import { Card, Icon, Image } from 'semantic-ui-react'
import GiftList from './GiftList';


export default observer(function GiftDashboard(){
    const {giftStore} = useStore();
    const {loadGifts, giftRegistry} = giftStore;

    useEffect(() => {
        if(giftRegistry.size <= 1) loadGifts();
    }, [giftRegistry.size, loadGifts])

    if(giftStore.loadingInitial) return <LoadingComponents content='Loading app'/>


    return(
        <Grid>
            <Grid.Column width='16'>
                <GiftList/>
            </Grid.Column>
        </Grid>
    )
    })