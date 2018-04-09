import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import LogIn from '../LogIn/LogIn.js';
import md5 from 'md5';

export default class Registration extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      username: '',
	      email: '',
	      password: '',
	      rePassword: ''
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.registerAccount = this.registerAccount.bind(this);
	}

	handleChange(event) {
		if (event.target.type === 'text') {
    		this.setState({username: event.target.value});
		} else if (event.target.id === 'password') {
    		this.setState({password: event.target.value});
		} else if (event.target.id === 're-password') {
			this.setState({rePassword: event.target.value});
		} else if (event.target.type === 'email') {
    		this.setState({email: event.target.value});
		}
  	}

  	updateErrorMessage(message) {
  		document.getElementById("error-message").innerHTML = message;
  		document.getElementById("error-message").style.color = "crimson";
  	}

  	registerAccount(event) {
  		event.preventDefault();
  		let password = this.state.password.replace(' ', '');
  		let rePassword = this.state.rePassword.replace(' ', '');
  		if (this.state.username.length <= 0 || this.state.email.length <= 0 
  			|| this.state.password.length <= 0 || this.state.rePassword.length <= 0) {
  			this.updateErrorMessage("Fill in all the fields!");
  		} else if (this.state.username.length < 3) {
  			this.updateErrorMessage("Username must be at least 3 charaters!");
  		} else if (!(this.state.email.includes('@') && this.state.email.includes('.'))) {
  			this.updateErrorMessage("Incorrect email signature!");
  		} else if (this.state.username.includes(' ')) {
  			this.updateErrorMessage("Username can't contain space(s)!");
  		} else if (password.length <= 5 || rePassword.length <= 5) {
  			this.updateErrorMessage("Password must be at least 6 charaters!");
  		} else if (rePassword !== password) {
  			this.updateErrorMessage("Password doesn't match!");
  		} else {
  			this.sendRegistrationData();
  		}
  	}

  	sendRegistrationData() {
  		axios.post('http://localhost:8082/quizzifly/api/users/register', {
			name: this.state.username,
			email: this.state.email,
	    	passwordHash: md5(this.state.password).toUpperCase(),
		  })
		  .then(function (response) {
		    ReactDOM.render(<LogIn />, document.getElementById('root'));
		  })
		  .catch(function (error) {
		  	this.updateErrorMessage("Something went wrong... Account not registerd!");
		  }.bind(this));
  	}

	render() {
	    return (
	      <div className="wrapper">
	      <link rel="stylesheet" type="text/css" href="LogIn/LogIn.css" />
	        <h1 className="main-title up">QUIZZIFLY</h1>
	        <form className="search-form" onSubmit={this.registerAccount}>
	        	<input type="text" name="quiz-id" placeholder="Username" className="search-input" onChange={this.handleChange} required />
	        	<input type="email" name="quiz-id" placeholder="Email" className="search-input" onChange={this.handleChange} required />
	          	<input type="password" name="quiz-id" id="password" placeholder="Password" className="search-input" onChange={this.handleChange} required />
	          	<input type="password" name="quiz-id" id="re-password" placeholder="Re-enter Password" className="search-input" onChange={this.handleChange} required />
	          	<input type="submit"  name="submit" value="Register" id="submit-button" className="register" onClick={this.registerAccount} />
	        </form>
	        <p id="error-message">
	        	Password must be at least 6 charaters!<br/>
	        </p>
	      </div>
	    );
  	}
}