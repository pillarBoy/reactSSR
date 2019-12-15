import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

import {connect} from 'react-redux'

import {getIndexList} from '../store/index'

function Index (props) {
		const [count, setCount] = useState(1)
		
		useEffect(() => {
			if (props.list.length===0) {
				props.getIndexList()
			}
		}, [])

    return <div>
        <h1>hi {props.title} !! {count}</h1>
        <button onClick={() => setCount(count+1)}>+1</button>
				<hr/>
				<Link to='/about'>about</Link>
				<ul>
					{
						props.list.map(item => {
							return <li key={item.id}>{item.name}</li>
						})
					}
				</ul>
    </div>
}


Index.loadData = (store) => {
	return store.dispatch(getIndexList())
}

export default connect(
	state => ({list: state.index.list}),
	{getIndexList}
)(Index)
