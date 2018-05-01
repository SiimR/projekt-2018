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
	      surveyJSON: {
		    "showQuestionNumbers": "off",
		    "elements": [
			{
				    "type": "text",
				    "name": "reference",
				    "title": "Quiz reference (like: Dogs1, CatsB):",
				    "isRequired": true
				}, {
			    "type": "paneldynamic",
			    "title": "Questions",
			    "name": "questions",
			    "keyName": "name",
			    "showQuestionNumbers": "none",
			    "templateTitle": "Question #{panelIndex}",
			    "templateElements": [
				{
				    "type": "text",
				    "name": "question",
				    "title": "Question:",
				    "isRequired": true
				}, {
				    "type": "text",
				    "name": "answer1",
				    "title": "Answer 1:",
				    "isRequired": true
				}, {
				    "type": "text",
				    "name": "answer2",
				    "title": "Answer 2:",
				    "isRequired": true,
				    "startWithNewLine": false
				}, {
				    "type": "text",
				    "name": "answer3",
				    "title": "Answer 3:",
				    "isRequired": true
				}, {
				    "type": "text",
				    "name": "answer4",
				    "title": "Answer 4:",
				    "isRequired": true,
				    "startWithNewLine": false
				}, {
				    "type": "dropdown",
				    "name": "right_answer",
				    "title": "Right answer number:",
				    "isRequired": true,
				    choices: [1, 2, 3, 4],
				}, {
				    "type": "text",
				    "name": "points",
				    "title": "Points (NOT obligatory):",
				    "startWithNewLine": false
			}
			    ],
			    "minPanelCount": 1,
			    "panelAddText": "Add another question",
			    "panelRemoveText": "Remove previous question"
			}
		    ]
		}
	    };
	    this.sendDataToServer = this.sendDataToServer.bind(this);
	   	this.changeJson = this.changeJson.bind(this);
	}

	sendDataToServer(survey) {
		console.log(survey.data);
  		let url = 'http://localhost:8082/quizzifly/api/quizzes/';
	    axios.post(url,
	    	this.changeJson(survey.data)
	    )
	      .then(response => {
	        ReactDOM.render(
		  		<Main userData={this.props.userData} quizCreationFailed={2} />, document.getElementById("root"));
	      }).catch(error => {
	        ReactDOM.render(
		  		<Main userData={this.props.userData} quizCreationFailed={1} />, document.getElementById("root"));
	      })  	
	     
	}

	changeJson(initialJson) {
		let userId = this.props.userData.id;
		let arrayOfQuestions = [];
		for (let i = 0; i < initialJson.questions.length; i++) {
			let question = initialJson.questions[i];
			let answers = [];
			let counter = 1;
			while(true) {
				if(!question["answer" + counter]) break;
				let answer = 
					{'content' : question["answer" + counter], 'correct': counter == question.right_answer};
				answers.push(answer);
				counter++;
			} 
			let questionJson = {
				'content': question.question, 
				'points': question.points ? question.points : 0, 
				'answers': answers};
			arrayOfQuestions.push(questionJson);
		}
		let newJson = {
		  "userId" : userId,
		  "reference" : initialJson.reference,
		  "questions": arrayOfQuestions
		}
		return newJson;
	}

	loadPreviousJson(json) {
		let newJson = {
		  "questions": [
		    {
		      "question": "pjoijp",
		      "answer1": "oijoih",
		      "answer2": "y8",
		      "answer3": "iuhiu",
		      "answer4": "hyuih",
		      "right_answer": "1"
		    }],
		  "reference": "json."
		};

		for (let i = 0; i == json.length; i++) {
			let questionJson = {
			"question": "pjoijp",
		      "answer1": "oijoih",
		      "answer2": "y8",
		      "answer3": "iuhiu",
		      "answer4": "hyuih",
		      "right_answer": "1"
			}
		}
		return newJson;
	}

	displaySurvey() {
		let survey = new Survey.Model(this.state.surveyJSON);
		//survey.data = ... 
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
