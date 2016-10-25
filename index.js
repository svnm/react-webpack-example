import React from 'react'
import ReactDOM from 'react-dom'
import Demo from './src/components/Demo'

function App(props) {
  return (
    <main>
      <Demo />
    </main>
  )
}

ReactDOM.render(
	React.createElement(App),
	document.getElementById('root'))
