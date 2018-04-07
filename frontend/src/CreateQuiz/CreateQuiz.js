import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Survey from 'survey-react';
import './CreateQuiz.css';

export default class CreateQuiz extends Component {

	sendDataToServer(survey) {
	  var resultAsString = JSON.stringify(survey.data);
	  console.log(resultAsString);
	}

	displaySurvey() {
		var surveyJSON = {
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
		    "panelRemoveText": "Remove item"
		}
	    ]
	};
	
	ReactDOM.render(
	  <Survey.Survey json={surveyJSON} onComplete={this.sendDataToServer}/>,
	  document.getElementById("surveyElement"));
	}

	componentDidMount() {
		this.displaySurvey();
	}


	render() {
		return (
			<div>
				<div id="surveyElement"></div>
				<div id="surveyResult"></div>
			</div>
		);
		}

}

