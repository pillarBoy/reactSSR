import React, { Component } from 'react'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import {Spin, Dropdown, Menu, Icon } from 'antd'
import {getGithubList, initGithubList} from '../store/index'

const Star = () => <img src="/static/star.png" alt=""/>
const Fork = () => <img src="/static/fork.png" alt=""/>

import './github.css'

let gitTimer = null

class Github extends Component {
  state = {
    lang: [
      {name: 'JavaScript', type: 'javascript'},
      {name: 'HTML', type: 'html'},
      {name: 'CSS', type: 'css'},
    ],
    hotTab: [
      {name: '热门', type: 'trending'},
      {name: '新生', type: 'upcome'},
    ],
    rankTab: [
      {name: '今日', type: 'day'},
      {name: '本周', type: 'week'},
      {name: '本月', type: 'month'},
    ],

    curCate: {name: '热门', type: 'trending'},
    curRank: {name: '今日', type: 'day'},
    curLang: {name: 'JavaScript', type: 'javascript'},
    page: 0,
    loading: false,
    hasMore: true
  }
  // 切换语言
  changeLang = ({key}) => {
    this.setState({
      curLang: this.state.lang[key],
      page: 0,
      hasMore: true,
      loading: false
    }, () => this.props.initGithubList())
  }

  // 切换今日 新生
  changeCate = ({key}) => {
    this.setState({
      curCate: this.state.hotTab[key],
      page: 0,
      hasMore: true,
      loading: false
    }, () => this.props.initGithubList())
  }

  // 切换月 日 周
  changeRank = ({key}) => {
    this.setState({
      curRank: this.state.rankTab[key],
      page: 0,
      hasMore: true,
      loading: false
    }, () => this.props.initGithubList())
  }

  initData(cb) {
    this.setState({
      page: 0,
      hasMore: true,
      loading: false
    }, () => cb())
  }
  getData = () => {
    if (this.state.loading) return
    this.setState({
      loading: true,
      hasMore: true
    })
    if (gitTimer) {
      clearTimeout(gitTimer)
    }
    gitTimer = setTimeout(async () => {
      // page, category="upcome", period='day', lang='javascript'
      await this.props.getGithubList({
        page: this.state.page, 
        lang: this.state.curLang.type, 
        period: this.state.curRank.type,
        category: this.state.curCate.type
      })
      this.setState({
        loading: false,
        page: this.state.page + 1,
      })
    })
  }

  render() {
    const langList = <Menu onClick={this.changeLang}>{this.state.lang.map((la, index) => <Menu.Item key={index}>{la.name}</Menu.Item>)}</Menu>
    const CateList = <Menu onClick={this.changeCate}>
      {
        this.state.hotTab.map((cate,cidx) => (<Menu.Item key={cidx}>{cate.name}</Menu.Item>))
      }
    </Menu>
    const RankList = <Menu onClick={this.changeRank}>
      {
        this.state.rankTab.map((r,ridx) => (<Menu.Item key={ridx}>{r.name}</Menu.Item>))
      }
    </Menu>

    return (
      <div className='github-list'>
        <div className="tab">
          <div>
            <span className="logo-start">GUB</span>
            <span className="logo-title">GitHub</span>
            <div className="tab-selector " style={{display: 'inline-block'}}>
              <Dropdown 
                trigger={['click']} 
                overlay={CateList}
                >
                <div>{this.state.curCate.name} <Icon type="down" /></div>
              </Dropdown>
            </div>
            <div className="tab-selector " style={{display: 'inline-block'}}>
              <Dropdown 
                trigger={['click']} 
                overlay={RankList}
                >
                <div>{this.state.curRank.name} <Icon type="down" /></div>
              </Dropdown>
            </div>
          </div>
          <div style={{display: 'inline-block'}}>
             <Dropdown 
              trigger={['click']} 
              overlay={langList}
              >
              <div>{this.state.curLang.name} <Icon type="down" /></div>
            </Dropdown>
          </div>
        </div>
        <div className="list-contain">
          <InfiniteScroll
            initialLoad={true}
            useWindow={false}
            pageStart={0}
            loadMore={this.getData}
            hasMore={this.state.hasMore}
            > 
            {
              this.props.index.gitList.map(item => (
                <a className="git-box" key={item.id} href={item.url}>
                  <div className="git-box-title" >{item.username} / {item.reponame}</div>
                  <div className='git-box-content'>{item.description}</div>
                  <div className="git-box-info">
                    <span><Star/>{item.starCount}</span>
                    <span><Fork/>{item.forkCount}</span>
                    <span>{item.lang}</span>
                  </div>
                </a>
              ))
            }
            {
              this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )
            }
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}

export default connect(state => state, { getGithubList, initGithubList } )(Github)