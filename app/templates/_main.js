// main.js
/** @jsx React.DOM */

'use strict';

console.log('\'Allo \'Allo!');

var React = require('react'),
    ExampleApp,
    CommentList,
    CommentForm, 
    CommentBox,
    Comment,
    data;

var data = [
    {author: "James Martin", text: "This is one comment"},
    {author: "Steven Iseki", text: "This is another comment"}
];

var CommentBox = require('./views/CommentBox.jsx')


React.render(
    <CommentBox data={data} />,
    document.getElementById('app')
);
