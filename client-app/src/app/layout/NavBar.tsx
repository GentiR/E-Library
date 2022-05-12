
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Menu, Image } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout, isLoggedIn } } = useStore();
    return (
        <Menu  inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    {/* <img src="assets/logo.png" alt="LOGO" style={{marginRight : '10px'}}/> */}
                  Libraria Spotify
                </Menu.Item>

                {isLoggedIn &&
                <>
                    <Menu.Item as={NavLink} to='/authors' name='Authors'/>
                    <Menu.Item as={NavLink} to='/books' name='Books'/>
                    <Menu.Item>
                        <Button as={NavLink} to='/createAuthor' positive content='Add a new author'/>
                        <Button as={NavLink} to='/contactForm' positive content='Contact Us' style={{marginLeft : '10px'}}/>
                        <Button as={NavLink} to='/createBook' positive content='Create Book'/>
                    </Menu.Item>

                    <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.firstname + " " + user?.lastname}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} 
                                text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                </>}
               
            </Container>
        </Menu>
    )
})