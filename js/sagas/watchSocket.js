import { take, put, call, apply, select, fork } from 'redux-saga/effects';
import { eventChannel, delay } from 'redux-saga';
import { Socket } from 'phoenix-js';
import { newMsg } from '../actions/messagesActions';
import currentUserSelector from '../selectors/currentUser';


const TIMEOUT = 10000;
const URL = 'http://192.168.0.103:4000/socket';
const LOBBY = 'rooms:lobby';

function* handleIO(chan) {
  yield fork(read, chan);
  yield fork(write, chan);
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
    chan.push(payload);
  }
}

function* subscribe(chan) {
  return eventChannel(emit => {

    chan.on('new:msg', msg => emit(newMsg(msg)));
    chan.on('user:entered', msg => console.log(msg));

    chan.join()
      .receive('ok', msg => console.log(msg))
      .receive('error', msg => console.log(msg));

    return () => {
      chan.leave();
    }
  });
}


export function* configureChannel() {
  let socket = new Socket(URL);
  yield call(() => socket.connect());
  const user  = yield select(currentUserSelector);
  let chan = socket.channel(LOBBY, { user });

  while(true) {
    const task = yield fork(handleIO, chan);
    const action = yield take('LOGOUT');
    yield cancel(task);
    yield call(() => socket.disconnect);
  }
}
