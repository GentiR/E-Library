import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { response } from 'express';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          <h1>hello</h1>
          {authors.map((author: any) => (
            <li key={author.id}>
              {author.name}
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
