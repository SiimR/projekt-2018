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
        //this.displayError("Wrong username or password!");
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
    console.log(elem.target.alt);
    if (elem.target.alt === "Active") {
      elem.target.alt = "Unactive";
      elem.target.src = require('../UserQuizes/unactive.png');
    } else {
      elem.target.alt = "Active";
      elem.target.src = require('../UserQuizes/active.png');
    }
  }

  displayUserQuizes(arrayQuizes) {
    let userQuizes = [];
    for (let index = arrayQuizes.data.length - 1; index >= 0; index--) {
      userQuizes.push(
        <tr key={"quiz-" + index}>
          <td>{arrayQuizes.data[index].name}</td>
          <td>{arrayQuizes.data[index].reference}</td>
          <td>
            <img className={"img-" + arrayQuizes.data[index].reference} src={ require('../UserQuizes/active.png') } 
            alt="Active" height="25" width="25" onClick={(elem)=>{this.changeQuizActiveStatus(elem)}} />
          </td>
          <td onClick={()=>{this.editQuiz(index)}} >
            <img src={ require('../UserQuizes/edit.png') } alt="Edit" height="25" width="25" />
          </td>
          <td>
            <img src={ require('../UserQuizes/bin.png') } alt="Delete" height="25" width="25" />
          </td>
        </tr>
      );
    }
    ReactDOM.render(userQuizes, document.getElementById('user-quizes'));
  }

  createNewQuiz() {
    ReactDOM.render(<CreateQuiz userData={this.props.userData} />, document.getElementById('root'));
  }

  displayQuizCreationNotification() {
    const notificationElement = document.getElementById("quiz-creation-notification");
    if (this.props.quizCreationFailed === 1) {
      notificationElement.innerHTML = "Quiz creation failed!";
      notificationElement.style.display = "block";
      notificationElement.style.color = "crimson";
    } else if (this.props.quizCreationFailed === 2) {
      notificationElement.innerHTML = "Quiz created!";
      notificationElement.style.display = "block";
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
