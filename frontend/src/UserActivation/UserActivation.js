import React, { Component } from 'react';
import './UserActivation.css';
import axios from 'axios';


export default class UserActivation extends Component {

  accountActivation() {
    axios.post('http://localhost:8082/quizzifly/api/users/login', {
        token: this.props.token,
        })
        .then(function (response) {
          this.displayMessage("Your account has been activated!", "green");
        })
        .catch(function (error) {
          this.displayMessage("Account activation failed!", "crimson");
        }.bind(this));
  }

  displayMessage(message, messageColor) {
    const errorElement = document.getElementById("message");
    errorElement.style.color = messageColor;
    errorElement.innerHTML = message;
    document.getElementById("home-button").style.display = "block";
  }

  navigateHome() {
    window.location.href = "http://localhost:3000";
  }

  componentDidMount() {
    this.accountActivation();
  }
  
  render() {
    return (
      <div >
        <p id="message">Activating account...</p>
        <input type="submit"  name="submit" onClick={this.navigateHome} value="Home" id="home-button" />
      </div>
    );
  }
  
}
