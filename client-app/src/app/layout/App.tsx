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
import ContactForm from '../../features/contactPage/contactForm';
import { Container } from 'semantic-ui-react';
import LoginForm from '../../features/users/LoginForm';
import WelcomePage from '../../features/home/WelcomePage';
import {useStore} from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingConponents';
import ModalContainer from '../common/modals/ModalContainer';
import EventDashboard from '../../features/Events/dashboard/EventDashboard';
import EventForm from '../../features/Events/form/EventForm';
import EventDetails from '../../features/Events/details/EventDetails';
import Users from '../../features/users/Users';
import LanguageForm from '../../features/Languages/LanguageForm';
import LanguageList from '../../features/Languages/LanguageList';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

    return (
      <>
      <ModalContainer/>
      <Route exact path='/' component={WelcomePage}/>
        <Route
        path={'/(.+)'}
          render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Route path='/index' component={HomePage}/>
              <Route path="/authors" component={AuthorDashboard}/>
              <Route path="/authors/:id" component={AuthorDetails}/>
              <Route key={location.key} path={['/createAuthor', '/manage/author/:id']} component={AuthorForm}/>
              <Route exact path="/books" component={BookDashboard}/>
              <Route path="/books/:id" component={BookDetails}/>
              <Route path={['/createBook', '/manage/book/:id']} component={BookForm}/> 
              <Route path='/login' component={LoginForm}/>
              <Route path='/users' component={Users}/>
              <Route exact path="/contactForm" component={ContactForm}/>
            <Route exact path='/events' component={EventDashboard}/>
            <Route path="/events/:id" component={EventDetails}/>
            <Route exact path='/language' component={LanguageList}/>
            <Route path={['/createLanguage', '/manage/language/edit/:id']} component={LanguageForm}/>
            <Route path={['/createLanguage', '/manage/language/edit/:id']} component={LanguageForm}/>
          </Container>
          </>
          )}
        />
      </>
    );
          }
export default observer(App);
