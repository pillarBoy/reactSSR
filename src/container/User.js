import React, {useEffect} from 'react';
import  {connect} from 'react-redux'

import {getUserInfo} from '../store/User'
import {Redirect} from 'react-router-dom'

const User = (props) => {
  // return <Redirect to="/"></Redirect>
  useEffect(() => {
    if (!props.userinfo.name) {
      props.getUserInfo()
    }
  }, [])
  return <div>
    <h1>hi {props.userinfo.name},your best man is {props.userinfo.best}</h1>
  </div>
}


User.loadData = (store) => {
  return store.dispatch(getUserInfo())
}

export default connect(
	state => ({userinfo: state.user.userinfo}),
	{getUserInfo}
)(User)