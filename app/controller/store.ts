import { createStore,compose, applyMiddleware } from 'redux'
import { reducers } from './reducers/root.reducer'
import * as thunk from 'redux-thunk'

const middleware = [thunk.thunk]

const initState = {}

export default createStore(
    reducers,
    initState,
    compose(
        applyMiddleware(...middleware)
    )
)