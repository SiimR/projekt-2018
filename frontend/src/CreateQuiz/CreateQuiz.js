import React, { Component } from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
import * as Survey from 'survey-react';
import './createquiz.css';

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

=======
//import ReactDOM from 'react-dom';
import './CreateQuiz.css';
var number = 1;


export default class MakeQuiz extends Component {
	//registration() {
	//	ReactDOM.render(<Registration/>, document.getElementById('root'));
	//}

	render() {
	    return (
	      <div>
	      <link rel="stylesheet" type="text/css" href="CreateQuiz/CreateQuiz.css" />
	        <h1 className="title">Create Quiz</h1>
	        <form className="search-form">
	          <input type="question" name="question" placeholder="Question" className="answer" required />
	          <input type="answer" name="answer1" placeholder="Answer 1" className="answer" required />
              <input type="answer" name="answer2" placeholder="Answer 2" className="answer" required />
              <input type="answer" name="answer3" placeholder="Answer 3" className="answer" required />
              <input type="answer" name="answer4" placeholder="Answer 4" className="answer" required />
              <input type="submit"  name="submit" value="Submit" id="submit-button" />
            </form>
	      </div>
	    );
  	}
}
>>>>>>> 40b285ab24b1fc0cc7e3965f4e9c5ef1a3e305cc
