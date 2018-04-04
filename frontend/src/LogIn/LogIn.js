import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LogIn.css';
import '../Main/Main.css';
import Main from '../Main/Main.js';
import Registration from '../Registration/Registration.js';
import axios from 'axios';

export default class LogIn extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      username: '',
	      password: ''
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.handelLogIn = this.handelLogIn.bind(this);
	 }
	
	registration() {
		ReactDOM.render(<Registration/>, document.getElementById('root'));
	}

	handleChange(event) {
		if (event.target.type === 'text') {
    		this.setState({username: event.target.value});
    		console.log(this.state.username);
		} else if (event.target.type === 'password') {
    		this.setState({password: event.target.value});
		}
  	}
	
	sendLogInData() {
		axios.post('url', {
			data : {
				username: this.state.username,
		    	password: this.state.password,
			}
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		  	this.displayError("Wrong username or password!");
		  	ReactDOM.render(<Main username={this.state.username} />, document.getElementById('root'));
		  }.bind(this));
	}

	handelLogIn(event) {
		event.preventDefault();
		if (this.state.username.length === 0 || this.state.password.length === 0) {
			this.displayError("Fill in all the fields!");
		} else {
			this.sendLogInData();
		}
	}

	displayError(message) {
		document.getElementById("log-in-error").style.display = "block";
		document.getElementById("log-in-error").innerHTML = message;
	}

	render() {
	    return (
	      <div className="wrapper">
	      	<link rel="stylesheet" type="text/css" href="LogIn/LogIn.css" />
	        <h1 className="main-title up">QUIZZIFLY</h1>
	        <p className="moto">Quizzes from people to people</p>
	        <form className="search-form">
	          <input type="text" name="login" onChange={this.handleChange} placeholder="Username" className="search-input" required />
	          <input type="password" name="login" onChange={this.handleChange} placeholder="Password" className="search-input" required />
	          <p id="log-in-error">Wrong username or password!</p>
	          <input type="submit"  name="submit" onClick={this.handelLogIn} value="Log In" id="submit-button" />
	        </form>
	        <p className="create-account">Don't have an account?</p>
	        <button className="register-button" onClick={this.registration} >Register account!</button>
	      </div>
	    );
  	}
}