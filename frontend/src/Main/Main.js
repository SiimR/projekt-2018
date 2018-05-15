import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Main.css';
import './MainExtra.css';
import TakeQuiz from '../TakeQuiz/TakeQuiz.js';
import UserQuizes from '../UserQuizes/UserQuizes.js';
import axios from 'axios';


export default class Main extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      quizMaker: '',
      takeQuiz: 'quiz-transition-button',
      quizCreationFailed: null
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
      ReactDOM.render(<TakeQuiz userData={this.props.userData} />,
       document.getElementById('inner-root'));
    }
  }

  didComponentGetNewProps() {
    if (typeof this.props.quizCreationFailed !== "undefined" 
      && this.props.quizCreationFailed !== this.state.quizCreationFailed) {
      this.setState({quizCreationFailed: this.props.quizCreationFailed});
    }
  }

  componentDidMount() {
    ReactDOM.render(<TakeQuiz userData={this.props.userData} />,
      document.getElementById('inner-root'));
    this.didComponentGetNewProps();
    this.catchQuizCreationError();
  }

  logOut() {
    axios.post('http://localhost:8082/quizzifly/api/users/logout', {
          userData: this.props.userData,
      })
      window.location.reload();
  }

  catchQuizCreationError() {
    if (this.props.quizCreationFailed === 1 || this.props.quizCreationFailed === 2) {
      this.setState({quizMaker: 'quiz-transition-button'});
      this.setState({takeQuiz: ''});
    }
    if (this.props.quizCreationFailed === 1) {
      ReactDOM.render(
        <UserQuizes userData={this.props.userData} quizCreationFailed={1} />,
        document.getElementById('inner-root'));
      
    } else if (this.props.quizCreationFailed === 2) {
      ReactDOM.render(
        <UserQuizes userData={this.props.userData} quizCreationFailed={2} />,
        document.getElementById('inner-root'));
    }
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
              My quizzes
            </button>
          <div className="user-name">
            <span>{this.props.userData.name}</span>
            <span title="Log Out" onClick={this.logOut}>X</span>
          </div>
        </div>
        <div id="inner-root">
        </div>
      </div>
    );
  }
  
}
