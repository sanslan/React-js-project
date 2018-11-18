import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import 'bulma';
import './App.css';
import Header from './components/Header';
import BooksList from './components/BooksList';
import AddBook from './components/AddBook';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Footer from './components/Footer';
class App extends Component {

  constructor(props){
    super(props);
    this.isRegisteredHandler = this.isRegisteredHandler.bind(this);
    this.isLoggedinHandler = this.isLoggedinHandler.bind(this);
    this.state = {
      isRegistered: false,
      isLoggedin: false,
      token: ''
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
  render() {
    return (
        <Router>
          <div>
            <Header isLoggedin={ this.state.isLoggedin }/>
            { !this.state.isLoggedin && <Route exact path="/signup" component={() => <Signup isRegisteredHandler={ this.isRegisteredHandler } isRegistered={this.state.isRegistered}/>} />}
            { !this.state.isLoggedin && <Route exact path="/signin" component={() => <Signin isLoggedinHandler={ this.isLoggedinHandler } />} />}
            { this.state.isLoggedin && <Route exact path="/addbook" component={() => <AddBook isLoggedinHandler={ this.isLoggedinHandler } />} />}
            { this.state.isLoggedin && <Route exact path="/books" component={() => <BooksList token={ this.state.token } />} />}
            <Footer/>
          </div>
        </Router>
    
    );
  }
}

export default App;
