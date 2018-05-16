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
    this.createNewQuiz = this.createNewQuiz.bind(this);
  }

  getQuizesFromServer() {
    let url = 'http://localhost:8082/quizzifly/api/quizzes/?userId=' + this.props.userData.id;
    axios.get(url)
      .then(function (responseData) {
        this.displayUserQuizes(responseData);
        this.setState({listOfUserQuizes: responseData.data});
      }.bind(this))
      .catch(function (error) {
        this.displayError("No quizes found!", "crimson");
      }.bind(this));
    }

  editQuiz(index) {
    ReactDOM.render(
      <CreateQuiz userData={this.props.userData} 
      quizName={this.state.listOfUserQuizes[parseInt(index)].name} 
      quizRef={this.state.listOfUserQuizes[parseInt(index)].reference}
      quiz={this.state.listOfUserQuizes[parseInt(index)]} />, 
      document.getElementById('root'));
  }

  changeQuizActiveStatus(elem) {
    let url = 'http://localhost:8082/quizzifly/api/quizzes/';
    if (elem.target.alt === "Active") {
      elem.target.alt = "Unactive";
      elem.target.src = require('../UserQuizes/unactive.png');
      axios.put(url + 'deactivate/' + elem.target.className)
      .then(function (response) {
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      }.bind(this));
    } else {
      elem.target.alt = "Active";
      elem.target.src = require('../UserQuizes/active.png');
      axios.put(url + 'activate/' + elem.target.className)
      .then(function (response) {
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      }.bind(this));
    }
  }

  deleteQuiz(quizId) {
    let url = 'http://localhost:8082/quizzifly/api/quizzes/';
    axios.delete(url + quizId)
      .then(function (response) {
        let row = document.getElementById("quiz-" + quizId);
        row.parentNode.removeChild(row);
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      }.bind(this));
  }

  displayUserQuizes(arrayQuizes) {
    let userQuizes = [];
    for (let index = arrayQuizes.data.length - 1; index >= 0; index--) {
      userQuizes.push(
        <tr key={"quiz-" + index} id={"quiz-" + arrayQuizes.data[index].id}>
          <td>{arrayQuizes.data[index].name}</td>
          <td>{arrayQuizes.data[index].reference}</td>
          <td>
            <img className={arrayQuizes.data[index].id} src={require(arrayQuizes.data[index].active ? "../UserQuizes/active.png" : "../UserQuizes/unactive.png")} 
            alt={arrayQuizes.data[index].active ? "Active" : "Unactive"} height="25" width="25" onClick={(elem)=>{this.changeQuizActiveStatus(elem)}} />
          </td>
          <td onClick={()=>{this.editQuiz(index)}} >
            <img src={ require('../UserQuizes/edit.png') } alt="Edit" height="25" width="25" />
          </td>
          <td>
            <img src={ require('../UserQuizes/bin.png') } alt="Delete" height="25" width="25" 
            onClick={(elem)=>{this.deleteQuiz(arrayQuizes.data[index].id)}} />
          </td>
        </tr>
      );
    }
    ReactDOM.render(userQuizes, document.getElementById('user-quizes'));
  }

  createNewQuiz() {
    ReactDOM.render(<CreateQuiz userData={this.props.userData} />, document.getElementById('root'));
  }

  displayError(message, color) {
    const notificationElement = document.getElementById("quiz-creation-notification");
    notificationElement.innerHTML = message;
    notificationElement.style.display = "block";
    notificationElement.style.color = color;
  }

  displayQuizCreationNotification() {
    if (this.props.quizCreationFailed === 1) {
      this.displayError("Quiz creation failed!", "crimson");
    } else if (this.props.quizCreationFailed === 2) {
      this.displayError("Quiz created!", "green");
    } else if (this.props.quizCreationFailed === 3) {
      this.displayError("Quiz modified!", "green");
    } else if (this.props.quizCreationFailed === 4) {
      this.displayError("Quiz not modified!", "crimson");
    }
  }

  componentDidMount() {
    this.getQuizesFromServer();
    this.displayQuizCreationNotification();
  }

  render() {
    return (
	    <div className="quiz-wrapper">
        <div className="header">
          Name 
          <span>Quiz ID</span>
          <span>Active</span>
        </div>
        <table id="quiz-table">
          <tbody id="user-quizes">
          </tbody>
        </table>
        <p id="quiz-creation-notification"></p>
        <button className="register-button register-increase-margin" onClick={this.createNewQuiz} >New</button>
	    </div>
    );
  }
  
}
