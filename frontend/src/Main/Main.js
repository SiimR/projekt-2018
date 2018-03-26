import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Main.css';
import './MainExtra.css';
import ToQuiz from '../ToQuiz/ToQuiz.js';
import LogIn from '../LogIn/LogIn.js';
import axios from 'axios';

export default class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      quizMaker: true,
      takeQuiz: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
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
        <h1 className="main-title title-ex">QUIZZIFLY</h1>
        <div className="top-nav">
          <button className="make-quiz-button quiz-transition-button">Take a quiz</button>
          <button className="make-quiz-button">Make a quiz</button>
        </div>
        <div>
          <form className="search-form form-ex" onSubmit={this.handlePost} >
            <input type="text" name="quiz-id" onChange={this.handleChange} placeholder="Enter quiz ID" className="search-input increase-margin" />
            <span id="error">Couldn't find it, mate!</span>
            <input type="submit"  name="submit" value="Find!" id="submit-button" />
          </form>
        </div>
      </div>
    );
  }
  
}
