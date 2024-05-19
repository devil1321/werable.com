// store.ts
import { createStore, applyMiddleware, compose } from 'redux';
import * as thunkMiddleware from 'redux-thunk'; // If you're using thunk middleware
import { reducers as rootReducer, State as RootState } from './reducers/root.reducer'; // Import your root reducer and state

// Define middleware you want to use
const middleware = [thunkMiddleware.thunk]; // Example with thunk middleware, you can add more middleware as needed

const enhancer = compose(applyMiddleware(...middleware));

export default createStore(rootReducer,{}, enhancer);


