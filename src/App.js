import './App.css';
import React, { useEffect, useState } from "react";
import Autocomplete from "./Autocomplete";
import get_queries from "./queries"
import {stemmer} from 'stemmer'
import {decrypt, encrypt} from 'sjcl'
import ReactDOM from 'react-dom';

var password = ""
var prevattempt = ""
var queries = get_queries(password);
var autocomplete = <Autocomplete suggestions={queries} style={{textAlign : "left"}}/>;

function handlePassword(event){
  if ((event.target.value).length > prevattempt.length){
    password = event.target.value;
  }
  prevattempt = event.target.value;
  queries = get_queries(password);
  autocomplete = <Autocomplete suggestions={queries}/>;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}


function handleUser(event){
  if ((event.target.value).length >= prevattempt.length){
    password = event.target.value;
  }
  prevattempt = event.target.value;
  queries = get_queries(password);
  autocomplete = <Autocomplete suggestions={queries}/>;
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function App() {
  return (
    
    <div className="App">
      <form style={{
                position: 'absolute',
                left: 5,
                top: 5,
                color: "white",
          }}
          form onSubmit={e => { e.preventDefault(); }}>
          <label>Password: </label>
          <input type = "textarea"
            name = "textValue"
            onChange = {handlePassword} 
            style = {{width: "200px"}}
          />
      </form>

      <form style={{
                position: 'absolute',
                left: 5,
                top: 45,
                color: "white",
          }}
          form onSubmit={e => { e.preventDefault(); }}>
          <label>User type: </label>
          <input type = "textarea"
            name = "textValue"
            onChange = {handleUser} 
            style = {{width: "200px"}}
          />
      </form>

      <header className="App-header">
        <p>
          Enter text to see autocomplete options below.
        </p>
      
      {autocomplete}
      </header>
      
    </div>
  );
}

export default App; 

/*
import React from "react";
import Autocomplete from "./Autocomplete";
import './App.css';


function App() {
  return (
    <div classname="App">
      <header classname="App-header">
        <h1>Autocomplete Search Bar</h1>
        <h2>Start typing below to view autocomplete options!</h2>
        <Autocomplete suggestions={["Oranges", "Apples", "Banana", "Kiwi", "Mango"]}/>
      </header>
    </div>
  );
}

export default App */