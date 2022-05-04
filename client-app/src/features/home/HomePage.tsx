import React from "react";
import { Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ImageSlider from "../Authors/details/HomeDetails/Slider/components/ImageSlider";
import { SliderData } from "../Authors/details/HomeDetails/Slider/components/SliderData";
import AuthorDashboard from "../Authors/dashboard/AuthorDashboard";

export default function HomePage(){
    return(
        <Container style={{marginTop: '7em'}}>
            <h1>Home Page</h1>
            <ImageSlider slides={SliderData} />       
        </Container>
    )
}