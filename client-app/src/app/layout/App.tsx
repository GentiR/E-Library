import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { response } from 'express';
import { Header, List } from 'semantic-ui-react';
import { Author } from '../models/author';
function App() {

  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    axios.get<Author[]>('http://localhost:5000/api/authors').then(response => {
      setAuthors(response.data);
  })
//this array ensures that the code runs only one time
  },  [])
  return (
    <div >
     <Header as='h2' icon='users' content='E-Library' />
    
        <List>
          {authors.map(author => (
            <List.Item key={author.id}>
              {author.name}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
