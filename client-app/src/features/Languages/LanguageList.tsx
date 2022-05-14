import React, { SyntheticEvent, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button, Icon, Table } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';

export default observer( function Users(){
    const{languageStore, userStore} = useStore();
   const {languageByName, loading, deleteLanguage} = languageStore;
   const [target, setTarget] = useState('');
   
   function handleLanguageDelete(e: SyntheticEvent<HTMLButtonElement>, id:string){
    setTarget(e.currentTarget.name);
    deleteLanguage(id);
}

    return ( 
        <Table>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Language Name</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {languageByName.forEach(function (language) {
                <Table.Row key={language.id}>
                    <Table.Cell>{language.languageName}</Table.Cell>
                    <Table.Cell> {userStore.isAdmin &&
                        <Button
                        name = {language.id} 
                        loading={loading && target=== language.id} 
                        onClick={(e) => handleLanguageDelete(e, language.id)} 
                        color='red'
                        content='Delete'
                        floated='right' /> 
                    }</Table.Cell>
                </Table.Row>
            })};
            </Table.Body>
        </Table>
    )
})