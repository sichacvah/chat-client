import { fork } from 'redux-saga/effects';

import { configureChannel } from './watchSocket';


export default function* root() {
  yield [
    fork(configureChannel)
  ];
}
