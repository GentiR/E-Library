import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { response } from 'express';
import { Header, List } from 'semantic-ui-react';
function App() {

  const[authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/authors').then(response => {
      console.log(response);
      setAuthors(response.data);
  })
//this array ensures that the code runs only one time
  },  [])
  return (
    <div >
     <Header as='h2' icon='users' content='E-Library' />
    
        <List>
          {authors.map((author: any) => (
            <List.Item key={author.id}>
              {author.name}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
