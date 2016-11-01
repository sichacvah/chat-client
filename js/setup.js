import React, { Component } from 'react';

import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import Chat from './containers/Chat';

const store = configureStore();

export default function setup() {
  console.disableYellowBox = true;
  class Root extends Component {
    render() {
      return (
        <Provider store={store}>
          <Router>
          <Scene
            key='root'
            component={Chat}
            title="Chat" />
          </Router>
        </Provider>
      );
    }
  }

  return Root;
}
