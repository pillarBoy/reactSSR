import React from 'react'
import { connect } from 'react-redux'
import TopNav from '../components/TopNav'
import './index.css'
import {getIndexList} from '../store/index'


const Index = (props) => {
  console.log(props)

  return (<div>
    <TopNav></TopNav>
    <div className="content">
      <div className="juejin-list">
        
      </div>
      <div className="github-list"></div>
    </div>
  </div>)
}

Index.getInitialProps = ({store}) => {
  let res = store.dispatch(getIndexList())
  return res
}

export default connect(state => state)(Index)