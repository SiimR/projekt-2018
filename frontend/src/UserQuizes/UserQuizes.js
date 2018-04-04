import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './UserQuizes.css';

export default class UserQuizes extends Component {
  
  render() {
    return (
	    <div>
        <table id="user-quizes">
          <tr>
            <th>Quiz Name</th>
            <th>Quiz ID</th>
            <th></th>
          </tr>
          <tr>
            <td>Cats</td>
            <td>Cats101</td>
            <td>X</td>
          </tr>
        </table>
        <button className="register-button register-increase-margin">New</button>
	    </div>
    );
  }
  
}
