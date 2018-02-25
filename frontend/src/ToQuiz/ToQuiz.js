import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuizPage from '../Quiz/QuizPage.js';

export default class ToQuiz extends Component {
  
  displayQuiz(event) {
    event.preventDefault();
    ReactDOM.render(<QuizPage data={this.props.data} name={this.props.name} />, document.getElementById('root'));
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title smaller">QUIZZIFLY</h1>
        <div id="quiz-name">{this.props.name}</div>
        <form className="search-form" onSubmit={this.displayQuiz.bind(this)} >
          <input type="text" name="player-name" placeholder="Enter nickname" className="search-input" /> 
          <input type="submit" name="submit" value="Start!" id="submit-button" />
        </form>
      </div>
    );
  }
}
