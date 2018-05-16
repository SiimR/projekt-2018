import React, { Component } from 'react';
import axios from 'axios';

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

  makeSummaryJson() {
    let json = {
      quizId: this.getJson()[0].quizId,
      quizTitle: this.props.title,
      score: this.getScore() + "/" + this.getJson().length,
      username: this.props.nickname
    }
    return json;
  }

  sendQuizSummary() {
    axios.post('http://localhost:8082/quizzifly/api/users/', {
          userSummary: this.makeSummaryJson(),
      }).then(function (response) {
        this.displayResponseMessage("Results saved!", "green")
      })
      .catch(function (error) {
        this.displayResponseMessage("Error occurred! Results not saved", "crimson")
      }.bind(this));
  }

  displayResponseMessage(message, messageColor) {
    document.getElementById("summary-message").style.display = "block"
    document.getElementById("summary-message").innerHTML = message;
    document.getElementById("summary-message").style.color = messageColor;
  }

  componentDidMount() {
    this.sendQuizSummary();
  }

  render() {
    return (
      <div className="score-field">
        {this.props.nickname}, you answered &nbsp;
        { this.getScore(this.getAnswers())} out of {this.getJson().length} &nbsp;
        questions correct!
        <p id="summary-message" style={{display: "none"}}></p>
      </div>
    );
  }
}
