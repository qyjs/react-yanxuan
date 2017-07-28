import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers/index';

const loggerMiddleware = createLogger();

function configureStore() {
    return createStore(
        rootReducer,
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        )
    )
}
export default configureStore;