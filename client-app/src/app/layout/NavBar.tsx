import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';


export default function NavBar() {
    
    return (
        <Menu  inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="assets/logo.png" alt="LOGO" style={{marginRight : '10px'}}/>
                    E-Library
                </Menu.Item>
                    <Menu.Item as={NavLink} to='/authors' name='Authors'/>
                    <Menu.Item as={NavLink} to='/books' name='Books'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createAuthor' positive content='Add a new author'/>
                    <Button as={NavLink} to='/contactForm' positive content='Contact Us' style={{marginLeft : '10px'}}/>
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createBook' positive content='Create Book'/>
                </Menu.Item>
            </Container>
        </Menu>
        
    )
}