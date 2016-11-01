import React, { Component } from 'react';
import Chat from '../components/Chat';
import { createStructuredSelector } from 'reselect';
import { sendMessage } from '../actions/messagesActions';
import messages from '../selectors/messages';
import currentUser from '../selectors/currentUser';
import { connect } from 'react-redux';

class ChatContainer extends Component {
  render() {
    return (
      <Chat {...this.props} />
    );
  }
}

const actions = {
  sendMessage
};

const selectors = {
  currentUser,
  messages
};


export default connect(createStructuredSelector(selectors), actions)(ChatContainer);
