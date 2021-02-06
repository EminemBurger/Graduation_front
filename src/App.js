import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import Mappage from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login'
import { Link } from 'react-router-dom';
import Logo from './images/logo.png';

function App() {
  return (
    <div>
    <BrowserRouter>
      <nav className="main_nav">
        <img className="logo" src={Logo} alt="" />
        <ul className="nav_hh" >
          <Link to="/"><li className="nav_ul_and_li">Home</li></Link>
          <Link to="/about"><li className="nav_ul_and_li">About Us</li></Link>
          <Link to="/contact"><li className="nav_ul_and_li">Contact</li></Link>
          <Link to="/login"><li className="nav_ul_and_li">Login</li></Link>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/" component={Mappage} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
    </div>

  );
}

export default App;


