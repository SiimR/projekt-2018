import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './LogIn.css';
import Registration from '../Registration/Registration.js';


export default class LogIn extends Component {
	registration() {
		ReactDOM.render(<Registration/>, document.getElementById('root'));
	}
	render() {
	    return (
	      <div className="wrapper">
	      <link rel="stylesheet" type="text/css" href="LogIn/LogIn.css" />
	        <h1 className="main-title up">QUIZZIFLY</h1>
	        <form className="search-form">
	          <input type="email" name="quiz-id" placeholder="Email" className="search-input" required />
	          <input type="password" name="quiz-id" placeholder="Password" className="search-input" required />
	          <input type="submit"  name="submit" value="Log In" id="submit-button" />
	        </form>
	        <p className="create-account">Don't have an account?</p>
	        <button className="register-button" onClick={this.registration} >Register account!</button>
	      </div>
	    );
  	}
}