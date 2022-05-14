import React from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Icon, Table } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import RegisterAdmin from './RegisterAdmin';

export default observer( function Users(){
    const{userStore, modalStore} = useStore();
   const {userByFirstname} = userStore;

    return ( 
        <Table>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>E-mail address</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Role</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {userByFirstname.forEach(function (user) {
                <Table.Row key={user.id}>
                    <Table.Cell>{user.firstname}</Table.Cell>
                    <Table.Cell>{user.lastname}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                </Table.Row>
            })};
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                    <Table.HeaderCell />
                    <Table.HeaderCell colSpan='4'>
                    <Button  floated='right'
                            icon
                            labelPosition='left'
                            primary
                            size='small'
                            onClick={() => modalStore.openModal(<RegisterAdmin />)}
                            >
                            <Icon name='add user' /> Register Admin!
                        </Button>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
})