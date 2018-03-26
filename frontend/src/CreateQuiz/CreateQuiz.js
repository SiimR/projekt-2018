import React, { Component } from 'react';
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