import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import moment from 'moment';
import { View, Dimensions, Text } from 'react-native';
import Immutable from 'immutable';
import uuid from 'uuid';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const STATUS_BAR_HEIGHT = 40;
const CHAT_MAX_HEIGHT = SCREEN_HEIGHT - STATUS_BAR_HEIGHT;
const avatar = { uri: 'https://facebook.github.io/react/img/logo_og.png' };

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.handleSend = this.handleSend.bind(this);
  }

  handleSend(message) {
    this.props.sendMessage(message);
  }

  render() {
    const user = this.props.currentUser.toJS();
    const messages = this.props.messages.toJS();
    console.log(messages);
    return (
      <View style={{ flex: 1, paddingTop: 40 }}>
       <GiftedChat
          ref='giftedMessenger'
          onSend={ this.handleSend }
          maxHeight={ CHAT_MAX_HEIGHT - 20}
          senderImage={ avatar }
          messages={messages}
          user={{
            _id: uuid.v4(),
            name: user.name,
            avatar,
          }}
          />
      </View>
    );
  }
}
