import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../components/DevTools';

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(logger),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/reactjs/redux/releases/tag/v3.1.0

let store
if( process.env.NODE_ENV !== 'production') {
  store = createStore(rootReducer, initialState, enhancer);
} else {
  store = createStore(rootReducer, initialState)
}
  

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}