import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UserQuizes.css';
import axios from 'axios';
import CreateQuiz from '../CreateQuiz/CreateQuiz.js'; 

export default class UserQuizes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfUserQuizes: [],
    };
    this.getQuizesFromServer = this.getQuizesFromServer.bind(this);
    this.newQuiz = this.newQuiz.bind(this);
  }

  getQuizesFromServer() {
    axios.get('http://localhost:8082/quizzifly/api/quizzes/?userId=' + this.props.userData.id)
      .then(function (response) {
        this.displayUserQuizes(response);
        this.state.listOfUserQuizes = response.data;
      }.bind(this))
      .catch(function (error) {
        this.displayError("Wrong username or password!");
      }.bind(this));
    }

  displayUserQuizes(listOfUserQuizes) {
    let userQuizes = [];
    for (let index = listOfUserQuizes.data.length - 1; index >= 0; index--) {
      userQuizes.push(
        <tr>
          <td>{listOfUserQuizes.data[index].name}</td>
          <td>{listOfUserQuizes.data[index].reference}</td>
          <td>EDIT</td>
          <td>
            <img src={ require('../UserQuizes/bin.png') } alt="Delete" height="25" width="25" />
          </td>
        </tr>
      );
    }
    ReactDOM.render(userQuizes, document.getElementById('user-quizes'));
  }

  newQuiz() {
    ReactDOM.render(<CreateQuiz userData={this.props.userData} />, document.getElementById('root'));
  }

  componentDidMount() {
    this.getQuizesFromServer();
  }

  render() {
    return (
	    <div className="quiz-wrapper">
        <div className="header">
          Name 
          <span>Quiz ID</span>
        </div>
        <table id="quiz-table">
          <tbody id="user-quizes">
          </tbody>
        </table>
        <button className="register-button register-increase-margin" onClick={this.newQuiz} >New</button>
	    </div>
    );
  }
  
}
