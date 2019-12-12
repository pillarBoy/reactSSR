import axios from 'axios'
import { dispatch } from 'rxjs/internal/observable/pairs'

const GET_LIST = 'GET_LIST'

const changeList = list => ({
    type: GET_LIST,
    list
})

export const getIndexList = () => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9090/api/course/list')
            .then(res => {
                let {list} = res.data
                dispatch(changeList(list))
            })
    }
}

const defaultState = {
    list: []
}

export default (state=defaultState, action) => {
    switch (action.type) {
        case GET_LIST: 
            return {
                ...state, list: action.list
            }
        default: 
            return state
    }
}