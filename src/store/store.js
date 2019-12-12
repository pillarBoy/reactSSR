import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'
import indexReduce from './index'

const reducer = combineReducers({
    index: indexReduce
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store