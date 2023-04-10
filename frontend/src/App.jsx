// import logo from './logo.svg';
import './App.css';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { BrowserRouter } from 'react-router-dom';

import Logo from "../src/components/template/Logo";
import Nav from "../src/components/template/Nav";
import Footer from "../src/components/template/Footer";
import Routes from "./Routes";


function App() {
  return (
    <BrowserRouter>
        <div className='app'>
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>
  );
}

export default App;
