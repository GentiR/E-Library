import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponents from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import foto1 from '../../../Foto/laps.jpg';

export default observer( function GiftDetails(){
    const {giftStore}= useStore();
    const {selectedGift : gift, loadGift, loadingInitial} = giftStore;
    const {id} = useParams<{id: string}>();
  
    useEffect(() =>{
       if(id) loadGift(id);
    }, [id, loadGift]);

    if(loadingInitial || !gift) return <LoadingComponents/>

    return(
        <div className='detailsContainer'>
        <Card fluid>
            <Image src = {foto1}/>
            <Card.Content>
                <Card.Header>{gift.giftName}</Card.Header>
                <Card.Meta>
                    <span>{gift.giftQuantity}</span>
                </Card.Meta>
                <Card.Description>
                    {gift.giftPrice}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button.Group widths='2'>
                <Button as={Link} to={`/manage/gift/${gift.id}`}  basic color='blue' content='Edit'/>
                <Button as={Link} to={`/gifts`} basic color='grey' content='Cancel'/>
            </Button.Group>
        </Card.Content>

        </Card>
        </div>
    )
    })
    