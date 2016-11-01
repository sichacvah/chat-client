
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createLogger from 'redux-logger';
import reducers from '../reducers';
import sagas from '../sagas';

// const loggerMiddleware = createLogger({
//   stateTransformer: state => state.toJS(),
// });
//
// const createStoreWithMiddleware = applyMiddleware(
//   sagaMiddleware(sagas),
//   loggerMiddleware
// )(createStore);
//
// export default (initialState) => createStoreWithMiddleware(reducer, initialState);


let isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

let logger = createLogger({
  stateTransformer: state => state.toJS(),
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true
});

export default function configureStore(onComplete) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    compose(applyMiddleware(sagaMiddleware, logger))
  );
  if (isDebuggingInChrome) {
    window.store = store;
  }
  sagaMiddleware.run(sagas);
  return store;
}
