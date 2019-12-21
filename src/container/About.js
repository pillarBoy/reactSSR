import React from 'react'
import styles from './About.css'
import withStyles from '../withStyles'

function About(props) {
  return <div >
      <h1 className={styles.title}> about page</h1>
    </div>
}

export default withStyles(About, styles)

