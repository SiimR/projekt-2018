import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Main.css';
import ToQuiz from '../ToQuiz/ToQuiz.js';
import LogIn from '../LogIn/LogIn.js';
import CreateQuiz from '../CreateQuiz/CreateQuiz.js';
import axios from 'axios';

export default class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  loginPage() {
    ReactDOM.render(<LogIn/>, document.getElementById('root'));
  }

    createQuizPage() {
    ReactDOM.render(<CreateQuiz/>, document.getElementById('root'));
  }

  handlePost(event) {
    event.preventDefault();
    let url = 'http://localhost:8082/quizzifly/api/quizzes/' + this.state.value;
    axios.get(url)
      .then(response => {
        if (response.data["name"]) {
          const recivedData = JSON.stringify(response.data["questions"]);
          const name = response.data["name"];
          ReactDOM.render(<ToQuiz data={recivedData} name={name} />, document.getElementById('root'));
        } else {
          document.getElementById("error").style.display = "block";
        }
      }).catch(error => {
        document.getElementById("error").style.display = "block";
      })
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="main-title">QUIZZIFLY</h1>
        <form className="search-form" onSubmit={this.handlePost} >
          <input type="text" name="quiz-id" onChange={this.handleChange} placeholder="Enter quiz ID" className="search-input" />
          <span id="error">Couldn't find it, mate!</span>
          <input type="submit"  name="submit" value="Find!" id="submit-button" />
        </form>
        <div className="login-wrapper" onClick={this.loginPage}><a id="login">Make your own quiz</a></div>
	      <div className="createquiz-wrapper" onClick={this.createQuiz}><a id="createquiz">Create new quiz</a></div>
      </div>
    );
  }
  
}
