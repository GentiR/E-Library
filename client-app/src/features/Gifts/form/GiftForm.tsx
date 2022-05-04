import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingConponents';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function GiftForm(){
    const history = useHistory();
    const {giftStore} = useStore();
    const {createGift, updateGift, loading, loadGift, loadingInitial}= giftStore;
    const {id}= useParams<{id: string}>();

    const [gift, setGift] = useState({
        id: '',
        giftName: '',
        giftPrice: '',
        giftQuantity : '',
        image : '',
    });

    useEffect(() =>{
        if(id) loadGift(id).then(gift => setGift(gift!))
    },[id, loadGift]);

    function handleSubmit(){
        if(gift.id.length ===0){
            let newGift = {
                ...gift,
                id:uuid()
            };
            createGift(newGift).then(() => history.push(`/gifts/${newGift.id}`));
        }else{
            updateGift(gift).then(()=> history.push(`/gifts/${gift.id}`));
        }
    }

    function handleInputChange(event : ChangeEvent<HTMLInputElement| HTMLTextAreaElement>){
        const { name, value} = event.target;
        setGift({...gift, [name]:value})
    }

    return(

        <Segment clearing>
            <h1>Add a gift</h1>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='GiftName' value ={gift.giftName} name='giftName' onChange={handleInputChange}/>
                <Form.Input placeholder='GiftQuantity' value={gift.giftQuantity} name="giftQuantity" onChange={handleInputChange} />

                <Form.Input placeholder='GiftPrice' value={gift.giftPrice} name="giftPrice" onChange={handleInputChange} />

                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to={`/gifts/${gift.id}`}  floated='right'  type='button' content='Cancel'/>
                
            </Form>
        </Segment>

    )
    })