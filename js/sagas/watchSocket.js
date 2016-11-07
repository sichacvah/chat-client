import { take, put, call, apply, select, fork } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';
import { Socket } from 'phoenix-js';
import { newMsg } from '../actions/messagesActions';
import currentUserSelector from '../selectors/currentUser';
import _ from 'lodash';

const TIMEOUT = 10000;
const URL = 'http://192.168.0.103:4000/socket';
const LOBBY = 'rooms:lobby';

function* handleIO(chan) {
  yield [
    fork(write, chan),
    fork(read, chan),
  ];
}


function* read(chan) {
  const channel = yield call(subscribe, chan);
  while(true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(chan) {
  while(true) {
    const { payload } = yield take('SEND_MESSAGE');
    const user = yield select(currentUserSelector);
    yield call(() => chan.push('new:msg', {msg: _.first(payload), user: user.toJS().name}, TIMEOUT));
  }
}

function* subscribe(chan) {
  return eventChannel(emit => {
    chan.join()
      .receive('ok', msg => console.log('OK'))
      .receive('ignore', msg => console.log('ignore'));

    chan.onError(e => console.log("something went wrong", e));

    chan.on('new:msg', msg => {
      console.log(msg);
      return emit(newMsg(msg));
    });
    chan.on('user:entered', msg => console.log(msg));

    return () => {
      chan.leave();
    }
  });
}


export function* configureChannel() {
  let socket = new Socket(URL);
  yield call(() => socket.connect());
  const user  = yield select(currentUserSelector);
  let chan = socket.channel(LOBBY, { user: user.toJS().name });

  while(true) {
    const task = yield fork(handleIO, chan);
    const action = yield take('LOGOUT');
    yield cancel(task);
    yield call(() => socket.disconnect);
  }
}
