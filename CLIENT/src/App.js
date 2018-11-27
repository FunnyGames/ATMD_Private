import React, { Component } from "react";
import { BrowserRouter  as Router, Route, Link, Redirect} from 'react-router-dom'
//import { connect } from 'react-redux'

class App extends Component{
  state ={
    isAuthenticated: false
  };

  constructor(props){
    super(props);
    this.loadData();
  }

  loadData(){
    const token = localStorage.getItem('token');
    if(token) this.state.isAuthenticated = true;

  }

  render(){
    return (
      <div>
        {this.state.isAuthenticated ? <Redirect to="/home"/> : <Redirect to="/login" />}
      </div>
    )
  };
}
export default App;