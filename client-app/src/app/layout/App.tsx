import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import AuthorDashboard from '../../features/Authors/dashboard/AuthorDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AuthorForm from '../../features/Authors/form/AuthorForm';
import AuthorDetails from '../../features/Authors/details/AuthorDetails';

function App() {
const location = useLocation();
  return (
    <>
    <NavBar/>
    <Container style={{marginTop:'7em'}}>
      <Routes>
      <Route path="/" element={<HomePage />}/>
      {/* <Route path="/authors" element={<AuthorDashboard />}/>
      <Route path="/authors/:id" element={<AuthorDetails />}/>
      <Route key={location.key} path="/createAuthor" element={<AuthorForm />}/> */}

      {/* {['/createAuthor', '/manage/:id']} */}
      </Routes>
    
    </Container>
  
      
    </>
  );
}
export default observer(App);
