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
    this.handlePost = this.handlePost.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handlePost(event) {
    event.preventDefault();
    let url = '//api.jsonbin.io/b/' + this.state.value;
    axios.get(url)
      .then(response => {
        const recivedData = JSON.stringify(response.data);
        const name = response.data["title"];
        console.log(recivedData);
        ReactDOM.render(<ToQuiz data={recivedData} name={name} />, document.getElementById('root'));
      }).catch(error => {
        document.getElementById("error").style.display = "block";
      })

  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="main-title">QUIZZIFLY</h1>
        <form className="search-form" onSubmit={this.handlePost} >
          <input type="text" name="quiz-id" onChange={this.handleChange} placeholder="Enter quiz ID" className="search-input" />
          <span id="error">Couldn't find it, mate!</span>
          <input type="submit"  name="submit" value="Find!" id="submit-button" />
        </form>
        <a id="login">Make your own quiz</a>
      </div>
    );
  }
  
}
