import React, { Component } from 'react';
import './QuizPage.css';
import './QuizApp.js'

export default class QuizPage extends Component {
  //<button id="submit-button" className="buttona" onClick={nextQuestion({jsonX})}>Next</button>
  //        <button id="submit-button" className="buttona" onClick={this.nextQuestion(JSON.parse(this.props.data))}>Next</button>

  render() {
    return (
      <div className="wrapper">
        <h1 className="title smaller">QUIZZIFLY</h1>
        <div id="quiz-name">{this.props.name}</div>
        <div id="root">
          
          
        </div>
        <button id="submit-button" className="buttona" onClick={this.nextQuestion(JSON.parse(this.props.data))}>Next</button>
        <button id="home-button" className="buttona" onClick={() => {window.location.reload()}} style={{display: "none"}}>Retry!</button>
      </div>
    );
  }
}
