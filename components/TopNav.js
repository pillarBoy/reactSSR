import React, { Component } from 'react'
import './head.css'
import {Input, Select } from 'antd'
const { Option } = Select;


class Head extends Component {
  state = {
    list: [
      {name: 'Android', id: 1},
      {name: '前端', id: 2},
      {name: '设计', id: 3},
    ]
  }

  render() {
    return (
      <div className="head">
        <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
          <span className="logo">logo</span>
          <div className="top-input">
            <input type="text" placeholder="掘金搜索，如：Java，阿里巴巴，前端面试"/>
          </div>
        </div>
        <div className="top-right">
          <div><span>icon</span>掘金小册</div>
          <div><span>icon</span>下载掘金App</div>
          <div>
            <span>icon</span>
            <Select defaultValue={this.state.list[1].id} style={{border: 'none'}}>
              {
                this.state.list.map(op => <Option value={op.id} key={op.id}>{op.name}</Option>)
              }
            </Select>
          </div>
          <div><span></span><span></span><span></span></div>
        </div>
      </div>
    )
  }
}
export default Head