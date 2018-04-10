import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './QuizPage.css';
import Summary from '../Summary/Summary.js';
import Main from '../Main/Main.js';

export default class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      answers: [],
      json: JSON.parse(this.props.data)
    };
  }

  getAnsweredQuestionCount() {
    return this.state.count;
  }

  getAnswers() {
    return this.state.answers;
  }
  getJson() {
    return this.state.json;
  }
  getCurrentQuestoinAnswerCount() {
    return this.state.json[this.state.count]["answers"]["length"];
  }

  updateIndex() {
    this.setState({ count: this.state.count + 1 })
  }

  handleQuestions() {
    if(this.isReadyForQuestion()) {
      this.saveAnswer();
      if (this.isQuestionUnanswered()) {
        this.displayNextQuestion();
      } else {
        this.displaySummary();
      }
    } else {
      this.inputNotSelectedNotification();
    }
  }

  isReadyForQuestion() {
    return this.getAnsweredQuestionCount() === 0 || this.isInputSelected();
  }

  isInputSelected() {
    let int = 0; 
    while (true) {
      if (!document.getElementById("input-" + int)) break;
      if (document.getElementById("input-" + int).checked) {
        return true;
      }
      int++;
    }
    return false;
  }

  isQuestionUnanswered() {
    return this.getJson().length > this.getAnsweredQuestionCount();
  }

  displayNextQuestion() {
    const titleElement = <p className="main"> {this.getJson().title} </p>
    const questionsElement = this.buildQuestion();

    ReactDOM.render(titleElement, document.getElementById("quiz-name"));
    ReactDOM.render(questionsElement, document.getElementById("display"));

    this.inputNotSelectedNotification();
    this.updateIndex();
  }

  displaySummary() {
    document.getElementById("submit-quize").style.display = "none";
    document.getElementById("home-button").style.display = "block";
    const summaryElement = 
      <Summary nickname={this.props.userData.name} json={this.props.data} answers={this.state.answers} />;
    ReactDOM.render(summaryElement, document.getElementById("display"));
  }

  inputNotSelectedNotification() {
    const notification = <p id="notify">Choose an answer!</p>
    if (document.getElementById("notify")) {
      ReactDOM.render(notification, document.getElementById("notify-div"));
    } else if (document.getElementById("notify-div")) {
      ReactDOM.render("", document.getElementById("notify-div"));
    }
  }

  buildQuestion() {
    let answersToQuestions = [];
    for (let index = 0; index < this.getCurrentQuestoinAnswerCount(); index++) {
      answersToQuestions.push(
        <div key={String(this.getAnsweredQuestionCount()) + index}>
          <input id={"input-" + index} name="option" className="answer" type="radio" />
          {this.getJson()[this.getAnsweredQuestionCount()]["answers"][index]["content"]} 
          <br />
        </div>
      );
    }
    return (
      <div>
        <div className="quiz-field">
          <div className="question-nr">{this.getAnsweredQuestionCount() + 1}/{this.getJson().length}</div>
          <div className="question">{this.getJson()[this.getAnsweredQuestionCount()].content}</div>
          {answersToQuestions}
        </div>
        <div id="notify-div"></div>
      </div>  
      );
    }

  saveAnswer() {
    if (this.getAnsweredQuestionCount() > 0) {
      let inputIndex = 0;
      while (true) {
        let input = document.getElementById("input-" + inputIndex);
        if (input) {
          if (input.checked) {
            this.getAnswers().push(input.id.slice(-1))
          }
        } else {
          break;
        }
        inputIndex++; 
      }
    }
  }

  home() {
    ReactDOM.render(<Main userData={this.props.userData} />, 
      document.getElementById("root"));
  }

  componentDidMount() {
    this.handleQuestions();
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title smaller">QUIZZIFLY</h1>
        <div id="quiz-name">{this.props.name}</div>
        <div id="display">
            
        </div>
        <button id="submit-quize" className="buttona" onClick={() => {this.handleQuestions()}}>Next</button>
        <button id="home-button" className="buttona" onClick={() => {this.home()}} style={{display: "none"}}>Home!</button>
      </div>
    );
  }
}
