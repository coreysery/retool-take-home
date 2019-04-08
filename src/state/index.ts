import { combineReducers, createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { localStore, sagas } from './sagas';
import * as fromComponents from './components';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers({
      components: fromComponents.reducer,
    }),
    localStore.get(),
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

export default store;
