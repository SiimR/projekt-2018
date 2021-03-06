import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LogIn.css';
import '../Main/Main.css';
import Main from '../Main/Main.js';
import Registration from '../Registration/Registration.js';
import axios from 'axios';
import md5 from 'md5';
import UserActivation from '../UserActivation/UserActivation.js';

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
		} else if (event.target.type === 'password') {
    		this.setState({password: event.target.value});
		}
  	}
	
	sendLogInData() {
		axios.post('http://localhost:8082/quizzifly/api/users/login', {
				name: this.state.username,
		    	passwordHash: md5(this.state.password).toUpperCase(),
		  })
		  .then(function (response) {
		    ReactDOM.render(<Main userData={response.data} />, 
		  		document.getElementById('root'));
		  })
		  .catch(function (error) {
		  	this.displayError("Wrong username or password!");
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
		const errorElement = document.getElementById("log-in-error");
		if(errorElement.classList.contains("account-activation")) {
			errorElement.classList.remove("account-activation");
		}
		errorElement.style.display = "block";
		errorElement.innerHTML = message;
	}

	

	accountActivation() {
		const url = window.location.search;
		const token = url.substring(url.indexOf('=') + 1);
		if (url.indexOf("?token=") === 0) {
			ReactDOM.render(<UserActivation token={token} />, 
		  		document.getElementById('inner-root'));
		}
	}

	componentDidMount() {
		this.accountActivation();
	}

	render() {
	    return (
	      <div className="wrapper">
	      	<link rel="stylesheet" type="text/css" href="LogIn/LogIn.css" />
	        <h1 className="main-title up">QUIZZIFLY</h1>
	        <p className="moto">Quizzes from people to people</p>
	        <div id="inner-root">
		        <form className="search-form">
		          <input type="text" name="login" onChange={this.handleChange} placeholder="Username" className="search-input" />
		          <input type="password" name="login" onChange={this.handleChange} placeholder="Password" className="search-input" />
		          <p id="log-in-error">Wrong username or password!</p>
		          <input type="submit"  name="submit" onClick={this.handelLogIn} value="Log In" id="submit-button" />
		        </form>
		        <p className="create-account">Don't have an account?</p>
		        <button className="register-button" onClick={this.registration} >Register account!</button>
	        </div>
	      </div>
	    );
  	}
}