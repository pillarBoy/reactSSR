import React, { Component } from 'react'
import {connect} from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import {List, Spin, Dropdown, Menu, Icon } from 'antd'
import moment from 'moment'
moment.locale('zh-CN')

import './gold.css'
import {getGoldList, initGoldList} from '../store/index'

let goldTimer = null

class GoldList extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    GoldTabs: [
      {name: '首页', type: "all"},
      {name: '前端', type: "frontend"},
      {name: '后端', type: "backend"},
    ],
    order: 'heat', // 热门： "heat" 最新： "time",
    category: {name: '前端', type: "frontend"},// 'frontend' "backend"
    page: 1,
    hasMore: true,
    loading: false,
  }
  getData = () => {
    if (this.state.loading) return
    this.setState({
      loading: true,
    })
    if (goldTimer) {
      clearTimeout(goldTimer)
    }
    goldTimer = setTimeout(async () => {
      await this.props.getGoldList({page: this.state.page, order: this.state.order, category: this.state.category.type})
      this.setState({
        loading: false,
        page: this.state.page + 1,
      })
    })
  }
  // 切换gold 分类
  changeGoldCate = ({key}) => {
    this.props.initGoldList()
    this.setState({
      page: 0,
      category: this.state.GoldTabs[key],
      hasMore: true,
      loading: false
    })
  }

  // 切换 热门和最新分类
  changeGoldOrder(type) {
    this.props.initGoldList()
    this.setState({
      page: 0,
      order: type,
      hasMore: true,
      loading: false
    })
  }

  render() {
    const menuList = <Menu onClick={this.changeGoldCate}>{this.state.GoldTabs.map((op, index) => <Menu.Item key={index}>{op.name}</Menu.Item>)}</Menu>

    return (
      <div className="gold-list">
        <div className="tab">
          <div>
            <span className="logo-start">JUJ</span>
            <span className="logo-title">掘金</span>
            <div className='tab-selector' style={{display: 'inline-block'}}>
              <Dropdown 
                trigger={['click']} 
                overlay={menuList}
                >
                <div>{this.state.category.name} <Icon type="down" /></div>
              </Dropdown>
            </div>
          </div>
          <div>
            <span className={`hot-type ${this.state.order=='heat'?'hot-type-act':''}`} onClick={e => this.changeGoldOrder('heat')}>热门</span>
            <span className={`hot-type ${this.state.order=='time'?'hot-type-act':''}`} onClick={e => this.changeGoldOrder('time')}>最新</span>
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
            <List
              itemLayout="horizontal"
              dataSource={this.props.index.list}
              renderItem={item => (
                <List.Item className="list-item" key={item.id}>
                  <List.Item.Meta
                    className="list-item-content"
                    avatar={(<span className='list-start'>{item.collectionCount}</span>)}
                    title={<div className='list-content-title'>{item.title}</div>}
                    description={(<div className="list-content-bottom"><span>{moment(item.date.iso).fromNow()}</span></div>)}
                  ></List.Item.Meta>
                </List.Item>
              )} >
                {this.state.loading && this.state.hasMore && (
                  <div className="demo-loading-container">
                    <Spin />
                  </div>
                )}
              </List>
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}

export default connect(state => state, { getGoldList, initGoldList } )(GoldList)