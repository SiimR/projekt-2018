import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Main.css';
import './MainExtra.css';
import LogIn from '../LogIn/LogIn.js';
import TakeQuiz from '../TakeQuiz/TakeQuiz.js';
import UserQuizes from '../UserQuizes/UserQuizes.js';
import axios from 'axios';


export default class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      quizMaker: '',
      takeQuiz: 'quiz-transition-button',
    };
    this.changeView = this.changeView.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  changeView(element) {
    if (this.state.quizMaker === '' && element.currentTarget.id === 'make') {
      this.setState({quizMaker: 'quiz-transition-button'});
      this.setState({takeQuiz: ''});
      ReactDOM.render(<UserQuizes userData={this.props.userData} />, document.getElementById('inner-root'));
    } else if (this.state.takeQuiz === '' && element.currentTarget.id === 'take') {
      this.setState({quizMaker: ''});
      this.setState({takeQuiz: 'quiz-transition-button'});
      ReactDOM.render(<TakeQuiz userData={this.props.userData} username={this.props.username} />,
       document.getElementById('inner-root'));
    }
  }

  componentDidMount() {
    ReactDOM.render(<TakeQuiz userData={this.props.userData} username={this.props.username} />,
     document.getElementById('inner-root'));
  }

  logOut() {
    axios.post('http://localhost:8082/quizzifly/api/users/login', {
          userData: this.props.userData,
      })
      .then(function (response) {
        ReactDOM.render(<LogIn />, document.getElementById('root'));
      })
      .catch(function (error) {
        window.location.reload();
      });
  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="main-title title-ex">QUIZZIFLY</h1>
        <div className="top-nav">
            <button id="take" className={'make-quiz-button ' + this.state.takeQuiz} onClick={this.changeView}>
              Take a quiz
            </button>
            <button id="make" className={'make-quiz-button ' + this.state.quizMaker} onClick={this.changeView}>
              Make a quiz
            </button>
          <div className="user-name">
            <span>{this.props.username}</span>
            <span title="Log Out" onClick={this.logOut}>X</span>
          </div>
        </div>
        <div id="inner-root">
        </div>
      </div>
    );
  }
  
}
