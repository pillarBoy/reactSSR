import React, {Component} from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css';

import './index.css'
import TopNav from '../components/TopNav'
import GoldList from '../components/GoldList'
import Github from '../components/Github'

import {getGoldList, getGithubList} from '../store/index'


class Index extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    

    return (<div>
   
      <TopNav></TopNav>
      <div className="content">
        <GoldList></GoldList>
        <Github></Github>
      </div>
    </div>)
  } 
}

Index.getInitialProps = ({store}) => {
  store.dispatch(getGoldList(0))
  return
}

export default connect(state => state, { getGoldList } )(Index)