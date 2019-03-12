import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import Html from './Html'
import { ServerStyleSheet } from 'styled-components'

const port = 3000
const ip = 'localhost'
const server = express()

/* Creating a single index route to server our React app */
server.get('/', (req, res) => {
  const sheet = new ServerStyleSheet()
  const body = renderToString(sheet.collectStyles(<App />))
  const styles = sheet.getStyleTags()
  const title = 'Server side Rendering with react and styled components'

  res.send(
    Html({
      body,
      styles,
      title
    })
  );
});

server.listen(port, ip, function (err) {
  if (err) { console.log(err); return; }
  console.log(`listening on ${ip}:${port}`)
})
