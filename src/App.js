import React, { Component } from 'react';
import { BrowserRouter as Router,Redirect, Route} from "react-router-dom";

import 'bulma';
import './App.css';
import Header from './components/Header';
import BooksList from './components/BooksList';
import AddBook from './components/AddBook';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Signout from './components/Signout';
import Footer from './components/Footer';


class App extends Component {

  constructor(props){
    super(props);
    this.isRegisteredHandler = this.isRegisteredHandler.bind(this);
    this.isLoggedinHandler = this.isLoggedinHandler.bind(this);
    this.signOutHandler = this.signOutHandler.bind(this);
    this.state = {
      isRegistered: false,
      isLoggedin: false,
      token: null
    }
  }
  isRegisteredHandler(){
    this.setState({
      isRegistered: true
    });
  }
  isLoggedinHandler(token){
    this.setState({
      isLoggedin: true,
      token: token
    });
  }
  signOutHandler(token){
    this.setState({
      isLoggedin: false,
      token: null
    });
    return <Redirect to="/login"/>
  }
  render() {
    return (
        <Router>
          <div>
            <Header isLoggedin={ this.state.isLoggedin }/>
            <Route exact path="/signup" component={() => <Signup isRegisteredHandler={ this.isRegisteredHandler } isRegistered={this.state.isRegistered}/>} />
            <Route exact path="/signin" component={() => <Signin isLoggedin={ this.state.isLoggedin } isLoggedinHandler={ this.isLoggedinHandler } />} />
            <Route exact path="/signout" component={() => <Signout signOutHandler={ this.signOutHandler } />} />
            <Route exact path="/addbook" component={() => <AddBook token={ this.state.token }  isLoggedinHandler={ this.isLoggedinHandler } />} />
            <Route exact path="/books" component={() => <BooksList token={ this.state.token } />} />
            <Footer/>
          </div>
        </Router>
    
    );
  }
}

export default App;
