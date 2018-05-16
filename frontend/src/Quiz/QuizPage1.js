import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './QuizPage.css';
import Summary from '../Summary/Summary.js';
import Main from '../Main/Main.js';
import * as Survey from 'survey-react';
import axios from 'axios';

export default class QuizPage extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			    json: JSON.parse(this.props.data),
			    surveyJSON: {
				    title: this.props.quizName,
				    showProgressBar: "bottom",
				    startSurveyText: "Start Quiz",
				    pages: [],
				    completedHtml: "<h4>You have answered correctly <b id='correct'>{correctedAnswers}</b> questions from <b id='total'>{questionCount}</b>. Your result will be saved!</h4>"
				}
		}
		this.sendDataToServer = this.sendDataToServer.bind(this);

	}

	loadJsonFromServer() {
		var jsonFromServer = this.state.json;
		var timingJson = {};
		for (let i = 0; i < jsonFromServer.length; i++) {
			timingJson["question" + i] = jsonFromServer[i].content;
			let thisAnswers = [];
			let thisRightAnswer;
			for (let j = 0; j < jsonFromServer[i].answers.length; j++) {
				thisAnswers.push(jsonFromServer[i].answers[j].content);
				if (jsonFromServer[i].answers[j].correct == true) {
					thisRightAnswer = jsonFromServer[i].answers[j].content;
				} 
			}
			timingJson["answers" + i] = thisAnswers;
			timingJson["rightanswer" + i] = thisRightAnswer;
		}
		if (this.props.quizData.timer != 0) {
			timingJson["timer"] = this.props.quizData.timer;
		}

		return timingJson;
	}

	modifyInitialJson(initialJson) {
        if (initialJson["timer"] && initialJson["timer"] != 0) {
        	let timerPage = {questions: [{
        			                    type: "html",
        			                    html: "You have " + initialJson.timer + " seconds for every page and  " + 
        			                    initialJson.timer * (Object.keys(initialJson).length - 1)/3 + 
        			                    " seconds for the whole survey of " + (Object.keys(initialJson).length - 1)/3 + " questions.<br/>Please click on <b>'Start Quiz'</b> button when you are ready."
        			                }]};
		    this.state.surveyJSON.pages.push(timerPage);
            this.state.surveyJSON["showTimerPanel"] = "bottom";
            this.state.surveyJSON["maxTimeToFinishPage"] = initialJson.timer;
            this.state.surveyJSON["maxTimeToFinish"] = initialJson.timer * ((Object.keys(initialJson).length - 1)/3);
            this.state.surveyJSON["startSurveyText"] = "Start Quiz";
            this.state.surveyJSON["firstPageIsStarted"] = true;
        }
        for (let i = 0; i < (Object.keys(initialJson).length - 2)/3; i++) {
            var jsonQuestion = {
            questions: [
                    {
                        type: "radiogroup",
                        name: "question" + i,
                        title: initialJson["question" + i],
                        choicesOrder: "random",
                        choices: initialJson["answers" + i],
                        correctAnswer: initialJson["rightanswer" + i]
                    }
                ]
            };
            this.state.surveyJSON.pages.push(jsonQuestion);
        }
	}

	sendDataToServer(survey) {
    	document.getElementById("home-button").style.display = "block";
    	document.getElementById("home-button").style.marginTop = "-530px";
    	document.getElementById("home-button").style.marginLeft = "48%";
	}

	sendSummaryToServer(summary) {
		axios.post('http://localhost:8082/quizzifly/api/userAnswers', summary
      ).then(function (response) {
      })
      .catch(function (error) {
      }.bind(this));
	}

	displaySurvey() {
		this.modifyInitialJson(this.loadJsonFromServer());
		let survey = new Survey.Model(this.state.surveyJSON);
		ReactDOM.render(
	  		<Survey.Survey model={survey} onComplete={this.sendDataToServer}/>,
	  		document.getElementById("surveyElement"));
	}

	makeSummary() {
		let summary = {
			"total" : document.getElementById("total").innerHTML,
			"correct" : document.getElementById("correct").innerHTML,
			"userName" : this.props.userData.name,
			"quizReference" : this.props.quizRef
		}
		return summary;
	}

	home() {
		this.sendSummaryToServer(this.makeSummary());
	    ReactDOM.render(<Main userData={this.props.userData} />, 
	      document.getElementById("root"));
  	}
		
	componentDidMount() {
		this.displaySurvey();
	}

	render() {
		return (
			<div>
				<div id="surveyElement">

				</div>
				<div>
					<p id="summary-message" style={{display: "none"}}></p>
					<button id="home-button" className="next-action" onClick={() => {this.home()}} style={{display: "none"}}>
						Home!
					</button>
				</div>
			</div>
		);
	}
}