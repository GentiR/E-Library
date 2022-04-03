import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="assets/logo.png" alt="LOGO" style={{marginRight : '10px'}}/>
                    E-Library
                </Menu.Item>
                <Menu.Item name='Authors'/>
                <Menu.Item>
                    <Button positive content='Add a new author'/>
                </Menu.Item>
            </Container>
        </Menu>
        
    )
}