import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './QuizPage.css';

export default class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  getIndex(){
    return this.state.count;
  }
  updateIndex(){
    this.setState({ count: this.state.count + 1 })
    console.log(this.state)
  }

nextQuestion() {
  console.log(this.getIndex());
  const json = JSON.parse(this.props.data);
  let answers = [];
  let nrOfQuestions = Object.keys(json).length - 1;
  if(this.getIndex() === 0 || this.isSelected()) {
    this.saveAnswer(nrOfQuestions, answers, this.getIndex());
    if (nrOfQuestions > this.getIndex()) {
      const elem2 = <p className="main"> {json.title} </p>
      const element = this.buildQuestion(Object.keys(json[this.getIndex()]).length - 2, json, this.getIndex());

      ReactDOM.render(elem2, document.getElementById("quiz-name"));
      ReactDOM.render(element, document.getElementById("display"));

      this.handleNotification;
      this.updateIndex();
    } else {
      document.getElementById("submit-quize").style.display = "none";
      document.getElementById("home-button").style.display = "block";
      const element = this.summary(answers);
      ReactDOM.render(element, document.getElementById("display"));
    }
  } else {
    this.handleNotification;
  }
}

componentDidMount() {
  this.nextQuestion();
}

isSelected() {
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

handleNotification() {
  const notification = <p id="notify">Choose an answer!</p>
  if (document.getElementById("notify")) {
    ReactDOM.render(notification, document.getElementById("notify-div"));
  } else {
    ReactDOM.render("", document.getElementById("notify-div"));
  }
}

buildQuestion(questionCount, json) {
  
  let elements = [];
  for (let i = 0; i < questionCount; i++) {
    elements.push(<div key={String(this.getIndex()) + i}><input id={"input-" + i} name="option" className="answer" type="radio" value={json[this.getIndex()][{i}]} /> {json[this.getIndex()][i]} <br /></div>);
  }
  return (
    <div>
      <div className="quiz-field">
        <div className="question-nr">{this.getIndex() + 1}/{Object.keys(json).length - 1}</div>
        <div className="question">{json[this.getIndex()].question}</div>
        {elements}
      </div>
      <div id="notify-div"></div>
    </div>  
    );
  }

  getScore(answers) {
    let score = 0;
    const json = JSON.parse(this.props.data);
    for (let i = 0; i < Object.keys(json).length - 1; i++) {
      if (json[i]["correct"] === answers[i]) score++;
    }
    return score;
  }

  summary(answers) {
    const json = JSON.parse(this.props.data);
    return (
      <div className="score-field">
        Your final score: {this.getScore(answers)}/{Object.keys(json).length - 1}
      </div>
    );
  }

  saveAnswer(questionCount, answers) {
    if (this.getIndex() > 0 && questionCount !== answers.length) {
      let int = 0;
      while (true) {
        let input = document.getElementById("input-" + int);
        if (input) {
          if (input.checked) {
            answers.push(input.id.slice(-1))
          }
        } else {
          break;
        }
        int++; 
      }
    }
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title smaller">QUIZZIFLY</h1>
        <div id="quiz-name">{this.props.name}</div>
        <div id="display">
            
        </div>
        <button id="submit-quize" className="buttona" onClick={() => {this.nextQuestion()}}>Next</button>
        <button id="home-button" className="buttona" onClick={() => {window.location.reload()}} style={{display: "none"}}>Retry!</button>
      </div>
    );
  }
}
