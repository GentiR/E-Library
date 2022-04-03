import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";


export default function AuthorForm(){
    return(
        <Segment clearing>
         <Form>
             <Form.Input placeholder='Name'/>
             <Form.Input placeholder='Name'/>
             <Form.TextArea placeholder='Description'/>
             <Button floated="right" positive type="submit" content='Submit'/>
             <Button floated="right" type="button" content='Cancel'/>
         </Form>
        </Segment>
    )
}