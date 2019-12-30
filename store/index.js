const GET_LIST = 'GET_LIST'

const changeList = list => ({
    type: GET_LIST,
    list
})

export const getIndexList = () => {
  return (dispatch, getState, $axios) => {

      return $axios.post('/gold', {
        category: "frontend",
        order: "heat",
        offset: 0,
        limit: 30
      })
      .then(res => {
        console.log(res)
        let {data} = res.data
        dispatch(changeList(data))
      }).catch(err => {
        console.log(err)
      })
  }
}

const defaultState = {
  foo: 'foo123',
  list: []
}

const index = (state = defaultState, action) => {
  switch (action.type) {
    case 'FOO':
      return {...state, foo: action.payload};

    case GET_LIST: 
      return {
          ...state, list: action.list
      }
    default:
      return state
  }
}

export default index