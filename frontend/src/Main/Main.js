import React, { Component } from 'react';
import './Main.css';
import axios from 'axios';

export default class Main extends Component {



  handlePost = event => {
    event.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        const recivedData = response.data;
      })

  }

  render() {
    return (
      <div className="wrapper">
        <h1 className="title">QUIZZIFLY</h1>
        <form className="search-form" onSubmit={this.handlePost} >
          <input type="text" name="quiz-id" placeholder="Enter quiz ID" className="search-input" />
          <span className="error">Couldn't find it, mate!</span>
          <input type="submit"  name="submit" value="Find!" id="submit-button" />
        </form>
        <a id="login">Make your own quiz</a>
      </div>
    );
  }
  
}
