import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunk from 'redux-thunk'
import indexReduce from './index'
import userReduce from './user'
import axios from 'axios'

const clientAxios = axios.create({
	baseURL: '/'
})

const serverAxios = axios.create({
	baseURL: 'http://localhost:9090'
})

const reducer = combineReducers({
	index: indexReduce,
	user: userReduce
})

export const getServerStore = () => {
	return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
	const defaultStore = window.__context ? window.__context : {}
	return createStore(reducer, defaultStore, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
