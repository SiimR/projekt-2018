import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Survey from 'survey-react';
import './CreateQuiz.css';
import Main from '../Main/Main.js';
import './CreateQuizExtra.css';
import axios from 'axios';

export default class CreateQuiz extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	count : 0,
	      surveyJSON: {
		    "pages": [
		    	{
		            "name": "page1",
		            "elements": [
		                {
		                    "type": "paneldynamic",
		                    "name": "overview",
		                    "title": "Overview",
		                    "minPanelCount": 1,
		                    "maxPanelCount": 1,
		                    "templateElements": [
		                    	{
		                            "name": "quizTitle",
		                            "type": "text",
		                            "title": "Insert quiz title:",
		                            "isRequired": true
		                        }, {
		                            "name": "quizReference",
		                            "type": "text",
		                            "title": "Insert quiz reference code:",
		                            "isRequired": true
		                        }, {
		                            "name": "hasTimer",
		                            "type": "dropdown",
		                            "title": "Add timer to quiz:",
		                            "isRequired": true,
		                            "defaultValue": "No",
		                            "choices": ["Yes", "No"]
		                        }, {
		                        	"visibleIf": "{panel.hasTimer} = 'Yes'",
		                            "name": "timerCount",
		                            "type": "text",
		                            "title": "Time to answer each question in seconds:",
		                            "isRequired": false,
		                            "defaultValue": 5,
		                            "validators": [
				                        {
				                            "type": "numeric",
				                            "minValue": 1,
				                            "maxValue": 300
				                        }
				                    ]
		                        }, {
		                            "name": "isActive",
		                            "type": "dropdown",
		                            "title": "Quiz active after creaction:",
		                            "isRequired": true,
		                            "defaultValue": "Yes",
		                            "choices": ["Yes", "No"]
		                        }
		                    ]
		                }
		            ]
		        }, {
		            "name": "page2",
		            "elements": [
		                {
		                    "type": "paneldynamic",
		                    "name": "QA",
		                    "title": "Add questions & answer...",
		                    "renderMode": "progressTop",
		                    "templateTitle": "Question: {panel.question}",
		                    "templateElements": [
		                        {
		                            "name": "question",
		                            "type": "text",
		                            "title": "Insert question here...",
		                            "isRequired": true
		                        }, {
		                            "name": "correctAnswer",
		                            "type": "text",
		                            "title": "Correct answer...",
		                            "isRequired": true,
		                            "colCount": 0,
		                            "startWithNewLine": false,
		                            "validators": [
				                        {
				                            "type": "numeric",
				                            "minValue": 1,
				                            "maxValue": "{row.moreInfo.rowCount}"
				                        }
				                    ]
		                        }, {
		                            "type": "panel",
		                            "name": "moreInfo",
		                            "title": "Answers:",
		                            "elements": [
		                                {
		                                    "type": "matrixdynamic",
		                                    "name": "answerPanel",
		                                    "title": "",
		                                    "rowCount": 2,
		                                    "minRowCount": 2,
		                                    "columns": [
		                                    	{
		                                            "name": "answer",
		                                            "cellType": "text",
		                                            "title": "Insert answer(s) here...",                                            
		                                            "isRequired": true
		                                        }
		                                    ]
		                                }
		                            ]
		                        }
		                    ],
		                    "minPanelCount": 1,
		                    "panelAddText": "Add question",
		                    "panelRemoveText": "Remove question"
		                }
		            ]
		        }
		    ]
		}
	}
	    this.sendDataToServer = this.sendDataToServer.bind(this);
	   	this.changeInitialJson = this.changeInitialJson.bind(this);
	}


	sendDataToServer(survey) {
		
  		let url = 'http://localhost:8082/quizzifly/api/quizzes/';
	    axios.post(url,
	    	this.changeInitialJson(survey.data)
	    )
	      .then(response => {
	        ReactDOM.render(
		  		<Main userData={this.props.userData} quizCreationFailed={2} />, document.getElementById("root"));
	      }).catch(error => {
	        console.log(error);
	      })  	
	}

	changeInitialJson(initialJson) {
		let userId = this.props.userData.id;
		let arrayOfQuestions = [];
		for (let i = 0; i < initialJson["QA"].length; i++) {
			let question = initialJson.QA[i];
			let answers = [];
			let counter = 1;
			while(true) {
				if(!question.answerPanel[counter - 1]) {
					break;
				}
				let answer = 
					{'content' : question.answerPanel[counter - 1].answer, 'correct': counter == question.correctAnswer};
				answers.push(answer);
				counter++;
			} 
			let questionJson = {
				'content': question.question, 
				'points': question.points ? question.points : 0, 
				'answers': answers
			};
			arrayOfQuestions.push(questionJson);
		}
		let newJson = {
		  "userId" : userId,
		  "reference" : initialJson.overview[0].quizReference,
		  "name" : initialJson.overview[0].quizTitle,
		  "questions": arrayOfQuestions,
		  "active" : initialJson.overview[0].isActive === "Yes" ? true : false
		}
		if(initialJson.overview[0]["timerCount"]) {
			newJson["timer"] = initialJson.overview[0].timerCount;
		}
		return newJson;
	}

	editServerJson(serverJson) {
		let surveyJs = {
			"overview": [{}],
			"QA": []
		}
		surveyJs.overview[0]["isActive"] = serverJson.active ? "Yes": "No";
		surveyJs.overview[0]["quizTitle"] = serverJson.name;
		surveyJs.overview[0]["quizReference"] = serverJson.reference;
		if (serverJson["timer"]) {
			surveyJs.overview[0]["hasTimer"] = "Yes"
			surveyJs.overview[0]["timerCount"] = serverJson.timer;
		} else {
			surveyJs.overview[0]["hasTimer"] = "No";
		}
		for (let i = 0; i < serverJson.questions.length; i++) {
			let qaElement = {
				"question": serverJson.questions[i].content,
			}
			let answerPanel = [];
			for (let j = 0; j < serverJson.questions[i].answers.length; j++) {
				answerPanel.push({"answer" : serverJson.questions[i].answers[j].content});
				if (serverJson.questions[i].answers[j].correct) {
					qaElement["correctAnswer"] = j + 1;
				}
			}
			qaElement["answerPanel"] = answerPanel;
			surveyJs.QA.push(qaElement);
		}
		return surveyJs;
	}

	displaySurvey() {
		let survey = new Survey.Model(this.state.surveyJSON);
		if(this.props.quiz) {
			survey.data = this.editServerJson(this.props.quiz);
		}
		ReactDOM.render(
	  		<Survey.Survey model={survey} onComplete={this.sendDataToServer}/>,
	  		document.getElementById("surveyElement"));
	}
		
	componentDidMount() {
		this.displaySurvey();
	}

	render() {
		return (
			<div>
				<div id="surveyElement"></div>
			</div>
		);
	}
}
