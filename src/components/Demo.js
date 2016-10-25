import React, { Component } from 'react'
import styles from './Demo.css'
import CSSModules from 'react-css-modules'

@CSSModules(styles, { allowMultiple: true })
export default class Demo extends Component {

  constructor(props) {
    super(props)
  }

  handleClick() {
    console.log('you clicked me')
  }

  render() {
    return (
      <div styleName='demo'>
        <button onClick={() => this.handleClick()}
                styleName='button blue'>press me</button>
        <button onClick={() => this.handleClick()}
                styleName='button red'>press me</button>
      </div>
    )
  }
}
