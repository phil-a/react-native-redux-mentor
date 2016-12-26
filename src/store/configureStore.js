import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import reducers from '../reducers';
import ReduxThunk from 'redux-thunk';

export default function configureStore(initialState) {
  return {
    ...createStore(
      reducers,
      initialState,
      applyMiddleware(ReduxThunk),
      autoRehydrate(),
    )
  }
}
