import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuizPage from '../Quiz/QuizPage.js';

export default class ToQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }
  
  displayQuiz(event) {
    event.preventDefault();
    if (this.state.username.length > 1 && this.state.username.length <= 20) {
          ReactDOM.render(
            <QuizPage data={this.props.data} name={this.props.name} username={this.state.username} />,
           document.getElementById('root')
           );
    }
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title smaller">QUIZZIFLY</h1>
        <div id="quiz-name">{this.props.name}</div>
        <form className="search-form" onSubmit={this.displayQuiz.bind(this)} >
          <input type="text" name="player-name" onChange={this.handleChange} maxLength={20} placeholder="Enter nickname" className="search-input" /> 
          <p className="requirement">Nickname must be at most 20 characters!</p>
          <input type="submit" name="submit" value="Start!" id="submit-button" />
        </form>
      </div>
    );
  }
}
