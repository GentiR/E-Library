import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import AuthorDashboard from "../Authors/dashboard/AuthorDashboard";

export default function HomePage(){
    return(
        <Container style={{marginTop: '7em'}}>
            <h1>Home Page</h1>
            <h3>Go to <Link to="/authors">Events</Link></h3>        
        </Container>
    )
}