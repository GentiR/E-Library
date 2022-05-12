import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import ImageSlider from "../Authors/details/HomeDetails/Slider/components/ImageSlider";
import { SliderData } from "../Authors/details/HomeDetails/Slider/components/SliderData";
import AuthorDashboard from "../Authors/dashboard/AuthorDashboard";


export default function HomePage(){
    return(
        <Fragment>
            <Container style={{marginTop: '7em'}}>
        <h1>Home Page</h1>
        <ImageSlider slides={SliderData} />
        <Header/>
        <Segment inverted textAlign="center" vertical className="masthead">
       <Container>
       <Header as='h2' inverted content='Welcome to E-Library' />
        <Button as={Link} to='/books' size="huge" inverted>
            Take me to books
            </Button> 
       </Container>
        </Segment>
           
    </Container>
    </Fragment>
        
        
    )
}