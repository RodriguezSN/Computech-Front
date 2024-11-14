import { createStore, applyMiddleware, compose } from "redux"
//import thunkMiddleware from "redux-thunk";
import { thunk } from 'redux-thunk';
//import * as ReduxThunk from '/node_modules/.vite/deps/redux-thunk.js?v=c676fdca';
import rootReducer from "../reducer/reducer";

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


 const store = createStore(
    rootReducer,/*applyMiddleware(thunk)*/
    composeEnhacers(applyMiddleware(thunk))
);

export default store