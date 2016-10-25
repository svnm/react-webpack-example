require('babel-register');
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import path from 'path'
import Demo from './src/components/Demo'

const app = express()
const ip = 'localhost'
const port = 3000

/* Serve static */
app.use('/public', express.static(__dirname + '/public'))

/* Server render */
app.use(handleRender)

function App(props) {
  return (
    <main>
      <Demo />
    </main>
  )
}

function handleRender(req, res) {
  const html = renderToString(<App />)
  res.send('<!doctype html>\n' + renderToString(<HTML html={html} />))
}


const HTML = ({ html }) => (
  <html>
    <head>
      <link rel='stylesheet' type='text/css' href='/public/style.css' />
    </head>
    <body>
      <div id='root' dangerouslySetInnerHTML={{ __html: html }}/>
      <script src='/public/vendor.js' />
      <script src='/public/bundle.js' />
    </body>
  </html>
)

function renderPage(html) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>React Example</title>
        <link rel='stylesheet' type='text/css' href='/public/style.css' />
      </head>
      <body>
        <div id="root">${html}</div>
        <script src='/public/vendor.js' />
        <script src='/public/bundle.js' />
      </body>
    </html>
    `
}

app.listen(port, ip, function (err) {
  if (err) { console.log(err); return; }
  console.log(`listening on ${ip}:${port}`)
})
