import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/home/index';
import Footer from './components/navigation/footer';
import Header from './components/navigation/header';


function Routes() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default Routes;