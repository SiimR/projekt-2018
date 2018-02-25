import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Main.css';
import ToQuiz from '../ToQuiz/ToQuiz.js';
import axios from 'axios';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handlePost(event) {
    event.preventDefault();
    axios.get('//api.jsonbin.io/b/5a92f704a121bc097fe72f87')
      .then(response => {
        const recivedData = JSON.stringify(response.data);
        const name = response.data["title"];
        console.log(recivedData);
        ReactDOM.render(<ToQuiz data={recivedData} name={name} />, document.getElementById('root'));
      })

  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title">QUIZZIFLY</h1>
        <form className="search-form" onSubmit={this.handlePost} >
          <input type="text" name="quiz-id" onChange={this.handleChange} placeholder="Enter quiz ID" className="search-input" />
          <span className="error">Couldn't find it, mate!</span>
          <input type="submit"  name="submit" value="Find!" id="submit-button" />
        </form>
        <a id="login">Make your own quiz</a>
      </div>
    );
  }
  
}
