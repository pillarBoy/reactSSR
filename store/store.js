import {createStore} from "redux";
import {applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import axios from 'axios'

import index from './index'

const reducer = combineReducers({
  index
})

const clientAxios = axios.create({
	baseURL: '/resources/'
})

const serverAxios = axios.create({
	baseURL: 'https://extension-ms.juejin.im/resources/'
})

/**
* @param {object} initialState
* @param {boolean} options.isServer indicates whether it is a server side or client side
* @param {Request} options.req NodeJS Request object (not set when client applies initialState from server)
* @param {Request} options.res NodeJS Request object (not set when client applies initialState from server)
* @param {boolean} options.debug User-defined debug mode param
* @param {string} options.storeKey This key will be used to preserve store in global namespace for safe HMR 
*/
const makeStore = (initialState, options) => {
  if (options.isServer) {
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
  } else {
    return createStore(reducer, initialState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
  }
  // return createStore(reducer, initialState);
}


export default makeStore