import React from 'react';
import  {connect} from 'react-redux'

import {getUserInfo} from '../store/User'

const User = (props) => {
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