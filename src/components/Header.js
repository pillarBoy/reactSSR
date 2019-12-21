import React from 'react';

import { Link } from 'react-router-dom'

export default () => {
	return <div>
		<Link to="/">index</Link> |
    <Link to="/user">user</Link> |
    <Link to="/about">about</Link> |
    <Link to="/sdff">404</Link> |
  </div>
}