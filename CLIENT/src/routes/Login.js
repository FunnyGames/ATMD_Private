import React, { Component } from "react";
import '../css/login.css';
import '../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import * as auth from '../common/auth';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Route from "react-router-dom/Route";
import { Redirect } from "react-router-dom";
import { setInStorage, getFromStorage } from "../utils/storage";
import { EventEmitter } from "events";

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      id: undefined,
      password: undefined,
      errors: [],
      isAuthenticated: false,
      token: '',
      invalidInput: false
    };
  }
  
  //Setting the id
  idOnChangeHandler = event => {
    this.setState({ id: event.target.value });
    this.clearValidationErr("id");
  }
  //Setting the password
  passwordOnChangeHandler = event => {
    this.setState({ password: event.target.value });
    this.clearValidationErr("password");

  }

  //Clicking the LOGIN button
  loginPressHandler = event => {
    event.preventDefault();
    //grebing the state
    const {
      id,
      password,
      isAuthenticated,
      invalidInput
    }=this.state
    //checking if the fields are empty
    if(this.state.id == ""){
      return this.showValidatonErr("id" , "ID Cannot be empty");
    }
    else if(this.state.password == ""){
      return this.showValidatonErr("password" , "Password Cannot be empty");
    }
    //sending a request to the server
    fetch('/users/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        password: password
      }),
    }).then(res => {
      if(res .ok){
        res .json().then(json => {
          setInStorage('the_main_app', {token: json.token});
          this.setState({
            isAuthenticated: true,
            token: json.token
          });
        });
      }
      else{
        this.setState({invalidInput: true});
      }
    });
  }

  showValidatonErr(elm, msg){
    this.setState((prevState) => ({errors:[...prevState.errors, {elm, msg}] } ));
  }

  clearValidationErr(elm){
    this.setState((prevState)=> {
      let newArr = [];
      for(let err of prevState.errors){
        if(elm != err.elm){
          newArr.push(err);
        }
      }
      return {errors: newArr};
    });

  }

  resetPressHandler = event =>{
    //event.preventDefault();
    return <Redirect to='/reset'/>
  }


  render() {

    let idErr = null, passwordErr = null;
    for(let err of this.state.errors){
      if(err.elm == "id"){
        idErr = err.msg;
      }
      if(err.elm == "password"){
        passwordErr = err.msg;
      }
    }
    return (
    <div>
      {this.state.isAuthenticated ? <Redirect to="/home"/> : <div class="limiter">
      {this.isAuthenticated ? <Redirect to='/home'/> :<div class="container-login100">
          <div class="wrap-login100">
            <form method="post" class="login100-form validate-form">
              <span class="login100-form-logo">
                <i class="fa fa-address-card"></i>
              </span>

              <span class="login100-form-title p-b-34 p-t-27">
                Log in
              </span>

              <div class="wrap-input100 validate-input" data-validate = "Enter User ID">
                <input 
                class="input100" 
                type="text" 
                name="id" 
                placeholder="ID"
                value={this.state.id}
                onChange={this.idOnChangeHandler.bind(this)}
                required
                />
                <small className="danger-error">{idErr ? idErr : ""}</small>
                <span class="focus-input100" ><i id="icon" class="fa fa-address-book"/></span>
              </div>

              <div class="wrap-input100 validate-input" data-validate="Enter password">
                <input 
                class="input100" 
                type="password" 
                name="pass" 
                placeholder="Password"
                value={this.state.password}
                onChange={this.passwordOnChangeHandler.bind(this)}
                required
                />
                <small className="danger-error">{passwordErr ? passwordErr : ""}</small>
                <span class="focus-input100" ><i id="icon" class="fa fa-key "/></span>
              </div>

              <div class="container-login100-form-btn">
                <button 
                class="login100-form-btn"
                onClick={this.loginPressHandler.bind(this)}
                >
                  Login
                </button>
              </div>
              {this.state.invalidInput ? (
                  <h4 id="error">Invalid Password or ID</h4>
                ) : null }
                <button id="resetButton"
                onClick={this.resetPressHandler}
                >
                Reset Password
                </button>
          </form>
        </div>
      </div>}

    </div>
  }
    </div>
    );
  }
}

export default Login;
