import axios from 'axios'
import { dispatch } from 'rxjs/internal/observable/pairs'

const GET_USERINFO = 'GET_USERINFO'

const changeUserinfo = data => ({
    type: GET_USERINFO,
    data 
})

export const getUserInfo = () => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('/api/user/info')
            .then(res => {
                let {data} = res.data
                dispatch(changeUserinfo(data))
            })
    }
}

const defaultState = {
  userinfo: {}
}

export default (state=defaultState, action) => {
    switch (action.type) {
        case GET_USERINFO: 
            return {
                ...state, 
                userinfo: action.data
            }
        default: 
            return state
    }
}