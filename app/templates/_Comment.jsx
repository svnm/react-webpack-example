// Comment.jsx

'use strict';

var React = require('react');
var Comment;

module.exports = Comment = React.createClass({
    render: function() {
        return (
            <div className="CommentList">
                    <h2 className="commentAuthor">
                        {this.props.author}
                    </h2>
                    <span className="CommentChildren">
                        {this.props.children}
                    </span>
            </div>
            );
    }
})


