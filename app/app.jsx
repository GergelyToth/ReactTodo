var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

// Foundation
$(document).foundation();

// App SCSS
require('style!css!sass!Styles/app.scss');

// Components
var TodoApp = require('TodoApp');

ReactDOM.render(
	<TodoApp/>,
	document.getElementById('app')
);