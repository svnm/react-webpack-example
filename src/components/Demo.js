import React, { Component } from 'react'
import styled from 'styled-components'

export default class Demo extends Component {
  handleClick() {
    console.log('you clicked me')
  }

  render() {
    return (
      <DemoWrapper>
        <Button color="blue" onClick={() => this.handleClick()}>
          press me
        </Button>
        <br />
        <Button color="red" onClick={() => this.handleClick()}>
          press me
        </Button>
      </DemoWrapper>
    )
  }
}

const DemoWrapper = styled.div`
  padding: 20px;
  width: 200px;
  margin: 0 auto;
`

const Button = styled.button`
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 5px;
  text-align: center;
  transition: all 0.5s;
  width: 100%;
  ${props => getButtonColor(props.color)}

  &:hover {
    background-color: white;
  }
`

const getButtonColor = color => {
  if (color === 'blue') {
    return `
      background-color: blue;
      border: 2px solid blue;
      &:hover {
        color: blue;
        border: 2px solid blue;
      }
    `
  }
  if (color === 'red') {
    return `
      background-color: red;
      border: 2px solid red;
      &:hover {
        color: red;
        border: 2px solid red;
      }
    `
  }
}
