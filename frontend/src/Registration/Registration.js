import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Registration.css';


export default class Registration extends Component {
	render() {
	    return (
	      <div className="wrapper">
	      <link rel="stylesheet" type="text/css" href="LogIn/LogIn.css" />
	        <h1 className="main-title up">QUIZZIFLY</h1>
	        <form className="search-form">
	          <input type="email" name="quiz-id" placeholder="Email" className="search-input" required />
	          <input type="password" name="quiz-id" placeholder="Password" className="search-input" required />
	          <input type="password" name="quiz-id" placeholder="Re-enter Password" className="search-input" required />
	          <input type="submit"  name="submit" value="Register" id="submit-button" />
	        </form>
	      </div>
	    );
  	}
}