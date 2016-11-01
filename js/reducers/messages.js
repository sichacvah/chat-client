import { handleActions } from 'redux-actions';
import { List, fromJS } from 'immutable';

export default handleActions({
  NEW_MSG: (state, action) => state.push(fromJS(action.payload)),
  SEND_MESSAGE: (state, action) => {
    return state.push(fromJS(action.payload));
  }
}, List());
