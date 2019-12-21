import React from 'react'

export default function withStyles(Comp, styles) {
  return (props) => {
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss())
    }
    return <Comp {...props}></Comp>
  }
}