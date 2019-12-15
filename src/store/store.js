import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'
import indexReduce from './index'
import userReduce from './user'

const reducer = combineReducers({
	index: indexReduce,
	user: userReduce
})

export const getServerStore = () => {
	return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
	const defaultStore = window.__context ? window.__context : {}
	return createStore(reducer, defaultStore, applyMiddleware(thunk))
}
