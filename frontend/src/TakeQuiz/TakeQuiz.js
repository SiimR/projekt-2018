import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuizPage from '../Quiz/QuizPage1.js';
import axios from 'axios';


export default class TakeQuiz extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handlePost(event) {
    event.preventDefault();
    console.log(this.state.value);
    let url = 'http://localhost:8082/quizzifly/api/quizzes/' + this.state.value;
    axios.get(url)
      .then(response => {
        if (response.data["name"]) {
          const recivedData = JSON.stringify(response.data["questions"]);
          console.log(recivedData);
          const quizName = response.data["name"];
          console.log(JSON.parse(recivedData));
          ReactDOM.render(<QuizPage data={recivedData} quizName={quizName} userData={this.props.userData} />,
            document.getElementById('root'));
        } else {
          document.getElementById("error").style.display = "block";
        }
      }).catch(error => {
        document.getElementById("error").style.display = "block";
      })
  }

  render() {
    return (
	    <div>
	    	<p className="instruction-text">Enter "quiz ID" to participate in a quiz:</p>
			<form className="search-form form-ex" onSubmit={this.handlePost} >
				<input type="text" name="quiz-id" onChange={this.handleChange} placeholder="Enter quiz ID" className="search-input increase-margin" />
			<span id="error">Couldn't find it, mate!</span>
			<input type="submit"  name="submit" value="Find!" id="submit-button" />
			</form>
	    </div>
    );
  }
  
}
