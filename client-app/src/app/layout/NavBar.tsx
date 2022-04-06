import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="assets/logo.png" alt="LOGO" style={{marginRight : '10px'}}/>
                    E-Library
                </Menu.Item>
                <Menu.Item as={NavLink} to='/authors' name='Authors'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createAuthor' positive content='Add a new author'/>
                </Menu.Item>
            </Container>
        </Menu>
        
    )
}