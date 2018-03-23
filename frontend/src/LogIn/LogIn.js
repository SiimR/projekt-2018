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
	      email: '',
	      password: ''
	    };
	    this.handleChange = this.handleChange.bind(this);
	    this.handelLogIn = this.handelLogIn.bind(this);
	 }
	registration() {
		ReactDOM.render(<Registration/>, document.getElementById('root'));
	}
	handleChange(event) {
		if (event.target.type === 'email') {
    		this.setState({email: event.target.value});
    		console.log(this.state.email);
		} else if (event.target.type === 'password') {
    		this.setState({password: event.target.value});
		}
  	}
	
	handelLogIn() {

		axios.post('url', {
			data : {
				email: this.state.email,
		    	password: this.state.password,
			}
		  })
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    ReactDOM.render(<Main/>, document.getElementById('root'));
		  });
	}

	render() {
	    return (
	      <div className="wrapper">
	      	<link rel="stylesheet" type="text/css" href="LogIn/LogIn.css" />
	        <h1 className="main-title up">QUIZZIFLY</h1>
	        <p className="moto">Quizzes from people to people</p>
	        <form className="search-form">
	          <input type="email" name="login" onChange={this.handleChange} placeholder="Email" className="search-input" required />
	          <input type="password" name="login" onChange={this.handleChange} placeholder="Password" className="search-input" required />
	          <input type="submit"  name="submit" onClick={this.handelLogIn} value="Log In" id="submit-button" />
	        </form>
	        <p className="create-account">Don't have an account?</p>
	        <button className="register-button" onClick={this.registration} >Register account!</button>
	      </div>
	    );
  	}
}