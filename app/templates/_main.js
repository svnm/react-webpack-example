// main.js
/** @jsx React.DOM */

'use strict';

var data = [
    {author: "James Zeve Martin", text: "This is one comment"},
    {author: "Steven Iseki Martin", text: "This is another comment"}
];

var React = require('react');
var jQuery = require('jquery');
var CommentBox = require('./components/CommentBox.jsx')

React.render(
  <CommentBox data={data} />,
  document.getElementById('content')
);