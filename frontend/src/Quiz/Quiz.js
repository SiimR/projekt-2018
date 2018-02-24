import React, { Component } from 'react';
import './Quiz.css';
import './QuizApp.js'

class QuizPage extends Component {
  render() {
    return (
      <div className="wrapper">
        <h1 className="title smaller">QUIZZIFLY</h1>
        <div id="quiz-name"></div>
        <div id="root">
          
        </div>
        <button id="submit-button" className="buttona" onclick="nextQuestion({jsonX})">Next</button>
        <button id="home-button" className="buttona" onclick="location.reload();" style="display: none;">Retry!</button>
      </div>
    );
  }
}

export default QuizPage;
