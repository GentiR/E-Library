import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import BookDashboard from '../../features/Books/dashboard/BookDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import BookForm from '../../features/Books/form/BookForm';
import BookDetails from '../../features/Books/details/BookDetails';
import AuthorDashboard from '../../features/Authors/dashboard/AuthorDashboard';


function App() {

  const location = useLocation();

  return (
    <>
      
      <NavBar />
      <Container style={{marginTop:'7em'}}>
        
      <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/books" element={<BookDashboard />}/>
      <Route path="/books/:id" element={<BookDetails />}/>
      <Route  path="/createBook" element={<BookForm />}/>
      <Route path= "/manage/:id" element={<BookForm />}/>
      </Routes>

      </Container>
      
    </>
  );
}
export default observer(App);
