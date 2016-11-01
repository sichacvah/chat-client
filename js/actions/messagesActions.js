import { createActions } from 'redux-actions';


module.exports = createActions({
  NEW_MSG: (msg) => msg,
  SEND_MESSAGE: (msg) => msg
});
