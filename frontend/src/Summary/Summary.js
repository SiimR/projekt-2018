import React, { Component } from 'react';

export default class Summary extends Component {

  getJson() {
    return JSON.parse(this.props.json);
  }

  getAnswers() {
    return this.props.answers;
  }

  getScore() {
    let score = 0;
    for (let index = 0; index < this.getJson().length; index++) {
      if (this.getJson()[index]["answers"][this.getAnswers()[index]]["correct"]) score++;
    }
    return score;
  }

  render() {
    return (
      <div className="score-field">
        {this.props.nickname}, you answered {this.getScore(this.getAnswers())} out of {this.getJson().length} questions correct!
      </div>
    );
  }
}
