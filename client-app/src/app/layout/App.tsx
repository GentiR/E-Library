import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {  Container } from 'semantic-ui-react';
import { Author } from '../models/author';
import NavBar from './NavBar';
import AuthorDashboard from '../../features/Authors/dashboard/AuthorDashboard';

function App() {

  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    axios.get<Author[]>('http://localhost:5000/api/authors').then(response => {
      setAuthors(response.data);
  })
//this array ensures that the code runs only one time
  },  [])
  return (
    <>
    <NavBar/>
    <Container style={{marginTop:'7em'}}>
    <AuthorDashboard authors={authors}/>
    </Container>
      
    </>
  );
}

export default App;
