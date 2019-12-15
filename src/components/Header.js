import React from 'react';

import { Link } from 'react-router-dom'

export default () => {
	return <div>
		<Link to="/">index</Link> |
    <Link to="/about">about</Link> |
  </div>
}