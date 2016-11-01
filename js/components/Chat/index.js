import React, { Component } from 'react';
import GiftedMessenger from 'react-native-gifted-messenger';
import moment from 'moment';
import { View, Dimensions, Text } from 'react-native';
import { toArray } from 'immutable';

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
    console.log(toArray(this.props.messages));
    return (
      <View style={{ flex: 1 }}>
       <GiftedMessenger
          ref='giftedMessenger'
          handleSend={ this.handleSend }
          maxHeight={ CHAT_MAX_HEIGHT }
          senderImage={ avatar }
          messages={toArray(this.props.messages)}
          />
      </View>
    );
  }
}
