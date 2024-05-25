import React from 'react';
import {useRoutes} from "react-router-dom";

import './App.scss';

import {Footer, Header} from "./components";

import {routeConfig} from "./routes/routeConfig";

function App() {
  const routes = useRoutes(routeConfig);

  return (
    <div className="App">
      <Header />
      <main className="container">{routes}</main>
      <Footer />
    </div>
  );
}

export default App;
