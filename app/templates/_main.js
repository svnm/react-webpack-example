// main.js
/** @jsx React.DOM */

'use strict';

var data = [
    {author: "James Martin", text: "This is one comment"},
    {author: "Steven Iseki", text: "This is another comment"}
];

var React = require('react');
var CommentBox = require('./components/CommentBox.jsx')

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);