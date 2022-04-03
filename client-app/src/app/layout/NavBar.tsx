import React from 'react';
import { Button, Container, Menu, MenuHeader, MenuItem } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <MenuItem header>
                    <img src="#" alt="LOGO"/>
                    E-Library
                </MenuItem>
                <MenuItem name='Authors' />
                <MenuItem>
                    <Button positive content='Add a new author'/>
                </MenuItem>
            </Container>
        </Menu>
        
    )
}