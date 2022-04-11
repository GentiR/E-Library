import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import BookDashboard from '../../features/Books/dashboard/BookDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import BookForm from '../../features/Books/form/BookForm';
import BookDetails from '../../features/Books/details/BookDetails';
import AuthorDashboard from '../../features/Authors/dashboard/AuthorDashboard';
import AuthorDetails from '../../features/Authors/details/AuthorDetails';
import AuthorForm from '../../features/Authors/form/AuthorForm';


function App() {

  const location = useLocation();

  return (
    <>

     <Route exact path='/' component={HomePage}/>
      <Route
        render={() => (
        <>
          <NavBar/>
          <Container style={{marginTop: '7em'}}>
            <Route exact path="/authors" component={AuthorDashboard}/>
            <Route path="/authors/:id" component={AuthorDetails}/>
            <Route key={location.key} path={['/createAuthor', '/manage/author/:id']} component={AuthorForm}/>
            <Route exact path="/books" component={BookDashboard}/>
            <Route path="/books/:id" component={BookDetails}/>
            <Route  path={['/createBook', '/manage/book/:id']} component={BookForm}/> 
        </Container>
        </>
        )}
      />
    </>
  );
}
export default observer(App);
