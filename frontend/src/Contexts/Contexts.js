import React, { Component } from 'react';

const MyContexts = React.createContext();

export default class ContextProvider extends Component {
  state = {
    url: 'http://localhost:8082/quizzifly/api/',
  }

  render() {
    return (
      <MyContexts.Provider value="contextValue">
        {this.props.children}
      </MyContexts.Provider>
    );
  }
} 
