import React, { Component } from 'react';
import axios from 'axios';

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

  	registerAccount(event) {
  		event.preventDefault();
  		const errorMessageContainer = document.getElementById("error-message");
  		let password = this.state.password.replace(' ', '');
  		let rePassword = this.state.rePassword.replace(' ', '');
  		if (this.state.username.length <= 0 || this.state.email.length <= 0 
  			|| this.state.password.length <= 0 || this.state.rePassword.length <= 0) {
  			errorMessageContainer.innerHTML = "Fill in all the fields!";
  			errorMessageContainer.style.color = "crimson";
  		} else if (!(this.state.email.includes('@') && this.state.email.includes('.'))) {
  			errorMessageContainer.innerHTML = "Incorrect email signature!";
  			errorMessageContainer.style.color = "crimson";
  		} else if (this.state.username.includes(' ')) {
  			errorMessageContainer.innerHTML = "Username can't contain space(s)!";
  			errorMessageContainer.style.color = "crimson";
  		} else if (password.length <= 5 || rePassword.length <= 5) {
  			errorMessageContainer.innerHTML = "Password must be at least 6 charaters!";
  			errorMessageContainer.style.color = "crimson";
  		} else if (rePassword !== password) {
  			errorMessageContainer.innerHTML = "Password dosen't match!";
  			errorMessageContainer.style.color = "crimson";
  		} else {
  			this.sendRegistrationData();
  		}
  	}

  	sendRegistrationData() {
  		axios.post('url', {
			data : {
				username: this.state.username,
				email: this.state.email,
		    	password: this.state.password,
			}
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		  	console.log("hei!");
		  	//ReactDOM.render(<Main username={username} />, document.getElementById('root'));
		  });
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