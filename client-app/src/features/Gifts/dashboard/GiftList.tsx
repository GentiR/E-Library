import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Card, Icon, Image } from 'semantic-ui-react';
import foto1 from '../../../Foto/laps.jpg';



export default observer(function GiftList(){
    const {giftStore} = useStore();
    const {deleteGift, giftsByPrice, loading} = giftStore;
    const [target , setTarget] = useState('');

    function handeGiftDelete(e : 
        SyntheticEvent<HTMLButtonElement>, id:string){
            setTarget(e.currentTarget.name);
            deleteGift(id);
        }

        return (
            <Card.Group>
                {giftsByPrice.map(gift => (
                    <Card key = {gift.id}>
                    <Image src = {foto1} wrapped ui = {false }/>
                    <Card.Content>
                      <Card.Header>{ gift.giftName}</Card.Header>  
                     <Card.Meta> Sasia: <b> {gift.giftQuantity}</b></Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <b>
                            {gift.giftPrice} Euro
                        </b>
                    </Card.Content>
                    <Card.Content>
                    <Button as={Link} to={`/gifts/${gift.id}`} floated='right' content='View' color='blue'/>
                    <Button
                     name = {gift.id} 
                     loading={loading && target=== gift.id} 
                     onClick={(e) => handeGiftDelete(e, gift.id)} 
                     color='red'
                     content='Delete'
                     floated='right'/>
                    </Card.Content>
                    </Card>
                ))}
            
            </Card.Group>
        )})
       