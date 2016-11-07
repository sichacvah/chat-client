import { handleActions } from 'redux-actions';
import { List, fromJS } from 'immutable';


export default handleActions({
  NEW_MSG: (state, action) => state.unshift(fromJS({ ...action.payload.msg, user: { name: action.payload.user, _id: 20 } })),
}, List());


const toMsg = ({body, user}) => {

}
