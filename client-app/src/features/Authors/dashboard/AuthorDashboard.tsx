import React from "react"
import { Grid, List } from "semantic-ui-react"
import { Author } from "../../../app/models/author"
import AuthorForm from "../form/AuthorForm";
import AuthorList from "./AuthorList"

interface Props{
    authors: Author[];
}

export default function AuthorDashboard({authors}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <AuthorList authors={authors}/>
            
            </Grid.Column>
            <Grid.Column>
            <AuthorForm />
            </Grid.Column>
        </Grid>
    )
}
