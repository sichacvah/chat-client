import { combineReducers } from 'redux-immutablejs';
import messages from './messages';
import currentUser from './currentUser';

export default combineReducers({
  messages,
  currentUser
});
