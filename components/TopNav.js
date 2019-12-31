import React, { Component } from 'react'
import './head.css'
import { Dropdown, Menu, Icon } from 'antd';

class TopNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {name: 'Android', id: 1},
        {name: '前端', id: 2},
        {name: '设计', id: 3},
      ],
      curType: {}
    }
  }
  changeType = ({key}) => {
    this.setState({
      curType: this.state.list[key-1]
    })
  }

  componentDidMount() {
    this.setState({
      curType: this.state.list[0]
    })
  }

  render() {
    const menuList = <Menu onClick={this.changeType}>{this.state.list.map(op => <Menu.Item key={op.id}>{op.name}</Menu.Item>)}</Menu>

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
            <Dropdown 
              trigger={['click']} 
              overlay={menuList}
              >
              <div>icon {this.state.curType.name} <Icon type="down" /></div>
            </Dropdown>
          </div>
          <div><span></span><span></span><span></span></div>
        </div>
      </div>
    )
  }
}
export default TopNav