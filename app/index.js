'use strict';
var fs = require('fs');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('test-framework', {
      desc: 'Test framework to be invoked',
      type: String,
      defaults: 'mocha'
    });

    this.option('skip-welcome-message', {
      desc: 'Skips the welcome message',
      type: Boolean
    });

    this.option('skip-install', {
      desc: 'Skips the installation of dependencies',
      type: Boolean
    });

    this.option('skip-install-message', {
      desc: 'Skips the message after the installation of dependencies',
      type: Boolean
    });
  },

  initializing: function () {
    this.pkg = require('../package.json');

    if (!this.options['skip-welcome-message']) {
      this.log(yosay('Welcome to the Gulp React app generator! Out of the box I include CSS Skeleton, jQuery, React and and a gulpfile.js to build your app.'));
    }
  },

  cssFramework: function () {
    var done = this.async();

    var prompts = [{
      type: 'list',
      name: 'cssFramework',
      message: 'Which CSS framework would you like to use?',
      choices: [{
        name: 'LESS',
        value: 'LESS'
      }, {
        name: 'SASS',
        value: 'SASS'
      }]
    }];

    this.prompt(prompts, function (props) {
      this.cssFramework = props.cssFramework;
      done();
    }.bind(this));
  },
  

  writing: {
    gulpfile: function() {
      this.template('_gulpfile.js', 'gulpfile.js');
    },

    packageJSON: function() {
      this.template('_package.json', 'package.json');
    },

    git: function() {
      this.copy('gitignore', '.gitignore');
    },

    jshint: function () {
      this.copy('jshintrc', '.jshintrc');
    },

    editorConfig: function () {
      this.copy('editorconfig', '.editorconfig');
    },

    extras: function () {
      this.copy('favicon.ico', 'app/favicon.ico');
      this.copy('robots.txt', 'app/robots.txt');
    },

    images: function () {
      this.directory('images', 'app/images');
    },

    mainStylesheet: function () {
      var css = 'main';

      if (this.cssFramework === 'SASS') {
        css += '.scss';
      }
      if (this.cssFramework === 'LESS') {
        css += '.less';
      }

      this.copy('_' + css, 'app/styles/' + css);
    },

    writeIndex: function () {
      this.copy('_index.html', 'app/index.html');
    },

    app: function () {
      this.mkdir('app');
      this.mkdir('app/scripts');
      this.mkdir('app/scripts/templates');
      this.mkdir('app/styles');
      this.mkdir('app/fonts');
      this.copy('_main.js', 'app/scripts/main.js');
      this.copy('_Comment.jsx', 'app/scripts/templates/Comment.jsx');
      this.copy('_CommentBox.jsx', 'app/scripts/templates/CommentBox.jsx');
      this.copy('_CommentForm.jsx', 'app/scripts/templates/CommentForm.jsx');
      this.copy('_CommentList.jsx', 'app/scripts/templates/CommentList.jsx');
      this.copy('_skeleton.css', 'app/styles/skeleton.css');
      this.copy('_normalize.css', 'app/styles/normalize.css');

    }
  },

  install: function () {

    if (this.options['skip-install']) {
      return;
    }

    this.installDependencies({
      skipMessage: this.options['skip-install-message'],
      skipInstall: this.options['skip-install']
    });

    this.on('end', function () {

      this.invoke(this.options['test-framework'], {
        options: {
          'skip-message': this.options['skip-install-message'],
          'skip-install': this.options['skip-install']
        }
      });
    }.bind(this));
  }
});
