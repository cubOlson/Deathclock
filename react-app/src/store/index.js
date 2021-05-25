import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import session from './session'
import userReducer from './user'
import clockReducer from './clock'
import formReducer from './form'
import friendClockReducer from './friendClocks'
import followersReducer from './follows'


const rootReducer = combineReducers({
    session,
    users: userReducer,
    clock: clockReducer,
    form: formReducer,
    friendClock: friendClockReducer,
    followers: followersReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
