const GET_GOLD_LIST = 'GET_GOLD_LIST'

const changeGoldList = list => ({
    type: GET_GOLD_LIST,
    list
})

const GET_GITHUB_LIST = 'GET_GITHUB_LIST'

const INIT_GOLD_LIST = 'INIT_GOLD_LIST'
export const initGoldList = () => (dispatch) =>  (dispatch({ type: INIT_GOLD_LIST }))

const INIT_GITHUB_LIST = 'INIT_GITHUB_LIST'
export const initGithubList = () => (dispatch) => (dispatch({ type: INIT_GITHUB_LIST }))



export const getGoldList = ({page, order='heat', category='frontend'}) => {
  return (dispatch, getState, $axios) => {
      return $axios.post('/gold', {
        category,order,
        offset: page*30 || 0,
        limit: 30
      })
      .then(res => {
        let {data} = res.data
        dispatch(changeGoldList(data))
      }).catch(err => {
        console.log(err)
      })
  }
}

export const getGithubList = ({page=0, category="upcome", period='day', lang='javascript'}) => {
  return (dispatch, getState, $axios) => {
    return $axios.post('/github', {
      category, period, lang, limit: 30,
      offset: page*30 || 0,
    }).then((res) => {
      let {data} = res.data
      dispatch({type: GET_GITHUB_LIST, list: data})
    }).catch(err => {
      console.log(err)
    })
  }
}

const defaultState = {
  foo: 'foo123',
  list: [],
  gitList: []
}

const index = (state = defaultState, action) => {
  
  switch (action.type) {
    case 'FOO': {
      return {...state, foo: action.payload};
    }
    // gold
    case GET_GOLD_LIST: {
      return {
        ...state, list: [...state.list, ...action.list]
      }
    }
    case INIT_GOLD_LIST: {
      return {
        ...state, list: []
      }
    }

    // github
    case INIT_GITHUB_LIST: {
      return {
        ...state, gitList: []
      }
    }
    case GET_GITHUB_LIST: {
      return {
        ...state, gitList: [...state.gitList, ...action.list]
      }
    }
    default:
      return state
  }
}

export default index
