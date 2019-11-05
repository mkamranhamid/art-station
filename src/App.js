import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';
import logo from './logo.svg';
import './App.css';
import { database, auth } from "./config/firebase";
import { UserStore } from "./stores/user";

function App() {

  useEffect(() => {
    /* auth.createUserWithEmailAndPassword('mkamranhamid@gmail.com', '123456').catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    }); */
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
        {process.env.REACT_APP_FIREBAE_API_KEY}
        {JSON.stringify(process.env)}
      </header>
    </div>
  );
}

export default App;
