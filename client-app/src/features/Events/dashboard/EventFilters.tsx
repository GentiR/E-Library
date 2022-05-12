import React from "react";
import { Header, Menu, MenuItem } from "semantic-ui-react";
import Calendar from 'react-calendar';

export default function EventFilters(){
    return(
       <>
        <Menu vertical size='large' style={{width: '100%', marginTop: 28 }}>
            <Header icon='filter' attached color='teal' content='Filters'/>
            <MenuItem content='All Events'/>
            <MenuItem content="I'm going"/>
            <MenuItem content="I'm hosting"/>
        </Menu>
        <Header/>
        <Calendar/>
        </>
    )
}