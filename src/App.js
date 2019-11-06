import React, { useEffect } from 'react';
import { Provider } from 'mobx-react';
// import './App.css';
import { UserStore } from "./stores/user";
import { Routes } from "./Routes";

function App() {

  return (
    <Routes />
  );
}

export default App;
